"""
Ki Relationship Intelligence Graph
LangGraph implementation of Ki's Human-AI-Human framework
"""

from typing import TypedDict, List, Dict, Any, Optional
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic

from ..agents.empathy_agent import EmpathyAgent
from ..agents.conflict_resolution_agent import ConflictResolutionAgent
from ..agents.pattern_recognition_agent import PatternRecognitionAgent
from ..agents.anxiety_detection_agent import AnxietyDetectionAgent
from ..memory.relationship_memory import RelationshipMemory
from ..tools.emotional_analysis import EmotionalAnalysisTool
from ..tools.safety_detection import SafetyDetectionTool


class KiRelationshipState(TypedDict):
    """State for Ki's relationship intelligence graph"""
    
    # Core conversation state
    messages: List[BaseMessage]
    partner_a_messages: List[BaseMessage]
    partner_b_messages: List[BaseMessage]
    
    # Relationship context
    relationship_id: str
    relationship_stage: str  # dating, engaged, married, etc.
    relationship_duration: int  # months
    
    # Emotional intelligence
    emotional_states: Dict[str, Any]  # Current emotional states for both partners
    emotional_patterns: Dict[str, Any]  # Historical emotional patterns
    empathy_insights: Dict[str, Any]  # Empathy AI layer insights
    
    # Conflict and anxiety management
    conflict_detected: bool
    conflict_style_a: str  # Thomas-Kilmann style for partner A
    conflict_style_b: str  # Thomas-Kilmann style for partner B
    anxiety_detected: Dict[str, bool]  # anxiety detection for each partner
    safety_concern: bool
    
    # Pattern recognition
    communication_patterns: Dict[str, Any]
    relationship_insights: Dict[str, Any]
    growth_opportunities: List[str]
    
    # Response generation
    response_mode: str  # individual, joint, mediation
    personalized_responses: Dict[str, str]  # responses for each partner
    shared_insights: List[str]
    
    # Memory and learning
    conversation_summary: str
    key_learnings: List[str]
    relationship_progress: Dict[str, Any]


class KiRelationshipGraph:
    """Ki's core relationship intelligence graph using LangGraph"""
    
    def __init__(self, openai_api_key: str, anthropic_api_key: str):
        # Initialize LLMs
        self.openai_llm = ChatOpenAI(
            model="gpt-4",
            api_key=openai_api_key,
            temperature=0.7
        )
        
        self.anthropic_llm = ChatAnthropic(
            model="claude-3-sonnet-20240229",
            api_key=anthropic_api_key,
            temperature=0.7
        )
        
        # Initialize specialized agents
        self.empathy_agent = EmpathyAgent(self.anthropic_llm)
        self.conflict_agent = ConflictResolutionAgent(self.openai_llm)
        self.pattern_agent = PatternRecognitionAgent(self.openai_llm)
        self.anxiety_agent = AnxietyDetectionAgent(self.openai_llm)
        
        # Initialize tools
        self.emotional_tool = EmotionalAnalysisTool()
        self.safety_tool = SafetyDetectionTool()
        
        # Initialize memory system
        self.relationship_memory = RelationshipMemory()
        
        # Build the graph
        self.graph = self._build_graph()
    
    def _build_graph(self) -> StateGraph:
        """Build the Ki relationship intelligence graph"""
        
        # Create the graph
        workflow = StateGraph(KiRelationshipState)
        
        # Add nodes
        workflow.add_node("intake", self._intake_analysis)
        workflow.add_node("safety_check", self._safety_assessment)
        workflow.add_node("emotional_analysis", self._emotional_analysis)
        workflow.add_node("conflict_detection", self._conflict_detection)
        workflow.add_node("anxiety_detection", self._anxiety_detection)
        workflow.add_node("empathy_processing", self._empathy_processing)
        workflow.add_node("pattern_recognition", self._pattern_recognition)
        workflow.add_node("response_generation", self._response_generation)
        workflow.add_node("memory_update", self._memory_update)
        
        # Define the flow
        workflow.set_entry_point("intake")
        
        workflow.add_edge("intake", "safety_check")
        workflow.add_conditional_edges(
            "safety_check",
            self._safety_routing,
            {
                "emergency": "emergency_response",
                "continue": "emotional_analysis"
            }
        )
        
        workflow.add_edge("emotional_analysis", "conflict_detection")
        workflow.add_edge("conflict_detection", "anxiety_detection")
        workflow.add_edge("anxiety_detection", "empathy_processing")
        workflow.add_edge("empathy_processing", "pattern_recognition")
        workflow.add_edge("pattern_recognition", "response_generation")
        workflow.add_edge("response_generation", "memory_update")
        workflow.add_edge("memory_update", END)
        
        # Emergency response node
        workflow.add_node("emergency_response", self._emergency_response)
        workflow.add_edge("emergency_response", END)
        
        return workflow.compile(checkpointer=MemorySaver())
    
    async def _intake_analysis(self, state: KiRelationshipState) -> KiRelationshipState:
        """Initial analysis of incoming messages"""
        
        # Extract partner-specific messages
        latest_message = state["messages"][-1] if state["messages"] else None
        
        if latest_message:
            # Determine which partner sent the message (this would be determined by auth/session)
            # For now, we'll use a simple heuristic
            partner_id = getattr(latest_message, 'partner_id', 'A')
            
            if partner_id == 'A':
                state["partner_a_messages"].append(latest_message)
            else:
                state["partner_b_messages"].append(latest_message)
        
        return state
    
    async def _safety_assessment(self, state: KiRelationshipState) -> KiRelationshipState:
        """Check for safety concerns in the conversation"""
        
        latest_message = state["messages"][-1] if state["messages"] else None
        
        if latest_message:
            safety_result = await self.safety_tool.analyze(latest_message.content)
            state["safety_concern"] = safety_result.get("risk_level", "low") in ["high", "critical"]
        
        return state
    
    def _safety_routing(self, state: KiRelationshipState) -> str:
        """Route based on safety assessment"""
        return "emergency" if state["safety_concern"] else "continue"
    
    async def _emotional_analysis(self, state: KiRelationshipState) -> KiRelationshipState:
        """Analyze emotional states of both partners"""
        
        # Analyze emotional states for both partners
        partner_a_emotions = await self.emotional_tool.analyze_partner_emotions(
            state["partner_a_messages"]
        )
        partner_b_emotions = await self.emotional_tool.analyze_partner_emotions(
            state["partner_b_messages"]
        )
        
        state["emotional_states"] = {
            "partner_a": partner_a_emotions,
            "partner_b": partner_b_emotions,
            "alignment": self.emotional_tool.calculate_emotional_alignment(
                partner_a_emotions, partner_b_emotions
            )
        }
        
        return state
    
    async def _conflict_detection(self, state: KiRelationshipState) -> KiRelationshipState:
        """Detect and analyze conflicts"""
        
        conflict_analysis = await self.conflict_agent.analyze_conflict(
            state["messages"],
            state["emotional_states"]
        )
        
        state["conflict_detected"] = conflict_analysis["conflict_present"]
        state["conflict_style_a"] = conflict_analysis.get("style_a", "unknown")
        state["conflict_style_b"] = conflict_analysis.get("style_b", "unknown")
        
        return state
    
    async def _anxiety_detection(self, state: KiRelationshipState) -> KiRelationshipState:
        """Detect anxiety in either partner"""
        
        anxiety_a = await self.anxiety_agent.detect_anxiety(state["partner_a_messages"])
        anxiety_b = await self.anxiety_agent.detect_anxiety(state["partner_b_messages"])
        
        state["anxiety_detected"] = {
            "partner_a": anxiety_a["anxiety_present"],
            "partner_b": anxiety_b["anxiety_present"]
        }
        
        return state
    
    async def _empathy_processing(self, state: KiRelationshipState) -> KiRelationshipState:
        """Apply Ki's Empathy AI layer"""
        
        empathy_insights = await self.empathy_agent.generate_empathy_insights(
            state["emotional_states"],
            state["conflict_detected"],
            state["anxiety_detected"],
            state.get("relationship_stage", "unknown")
        )
        
        state["empathy_insights"] = empathy_insights
        
        return state
    
    async def _pattern_recognition(self, state: KiRelationshipState) -> KiRelationshipState:
        """Recognize relationship patterns and growth opportunities"""
        
        # Load relationship history
        relationship_history = await self.relationship_memory.get_relationship_history(
            state["relationship_id"]
        )
        
        patterns = await self.pattern_agent.analyze_patterns(
            state["messages"],
            relationship_history,
            state["emotional_states"]
        )
        
        state["communication_patterns"] = patterns["communication"]
        state["relationship_insights"] = patterns["insights"]
        state["growth_opportunities"] = patterns["growth_opportunities"]
        
        return state
    
    async def _response_generation(self, state: KiRelationshipState) -> KiRelationshipState:
        """Generate personalized responses using Ki's Human-AI-Human framework"""
        
        # Determine response mode
        if state["conflict_detected"]:
            response_mode = "mediation"
        elif any(state["anxiety_detected"].values()):
            response_mode = "support"
        else:
            response_mode = "growth"
        
        state["response_mode"] = response_mode
        
        # Generate personalized responses for each partner
        responses = await self._generate_dual_responses(state)
        state["personalized_responses"] = responses
        
        # Generate shared insights if appropriate
        if response_mode in ["growth", "mediation"]:
            shared_insights = await self._generate_shared_insights(state)
            state["shared_insights"] = shared_insights
        
        return state
    
    async def _generate_dual_responses(self, state: KiRelationshipState) -> Dict[str, str]:
        """Generate personalized responses for each partner"""
        
        # This is Ki's core innovation: simultaneous dual-user processing
        response_a = await self.empathy_agent.generate_personalized_response(
            partner="A",
            emotional_state=state["emotional_states"]["partner_a"],
            conflict_style=state.get("conflict_style_a", "unknown"),
            empathy_insights=state["empathy_insights"],
            response_mode=state["response_mode"]
        )
        
        response_b = await self.empathy_agent.generate_personalized_response(
            partner="B",
            emotional_state=state["emotional_states"]["partner_b"],
            conflict_style=state.get("conflict_style_b", "unknown"),
            empathy_insights=state["empathy_insights"],
            response_mode=state["response_mode"]
        )
        
        return {
            "partner_a": response_a,
            "partner_b": response_b
        }
    
    async def _generate_shared_insights(self, state: KiRelationshipState) -> List[str]:
        """Generate insights for shared conversation space"""
        
        return await self.empathy_agent.generate_shared_insights(
            state["empathy_insights"],
            state["relationship_insights"],
            state["growth_opportunities"]
        )
    
    async def _memory_update(self, state: KiRelationshipState) -> KiRelationshipState:
        """Update relationship memory with new learnings"""
        
        # Create conversation summary
        summary = await self.pattern_agent.create_conversation_summary(
            state["messages"],
            state["emotional_states"],
            state["empathy_insights"]
        )
        
        state["conversation_summary"] = summary
        
        # Extract key learnings
        key_learnings = [
            insight for insight in state["empathy_insights"].get("key_insights", [])
        ]
        state["key_learnings"] = key_learnings
        
        # Update relationship memory
        await self.relationship_memory.update_relationship_memory(
            relationship_id=state["relationship_id"],
            conversation_summary=summary,
            emotional_patterns=state["emotional_states"],
            insights=state["empathy_insights"],
            growth_opportunities=state["growth_opportunities"]
        )
        
        return state
    
    async def _emergency_response(self, state: KiRelationshipState) -> KiRelationshipState:
        """Handle emergency safety situations"""
        
        # Generate safety-focused response
        safety_response = await self.safety_tool.generate_safety_response(
            state["messages"][-1].content if state["messages"] else "",
            state["emotional_states"]
        )
        
        state["personalized_responses"] = {
            "partner_a": safety_response,
            "partner_b": safety_response
        }
        
        # Log safety incident for review
        await self.relationship_memory.log_safety_incident(
            state["relationship_id"],
            state["messages"][-1].content if state["messages"] else "",
            safety_response
        )
        
        return state
    
    async def process_conversation(
        self,
        relationship_id: str,
        message: str,
        partner_id: str,
        metadata: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """Main entry point for processing relationship conversations"""
        
        # Create initial state
        initial_state = KiRelationshipState(
            messages=[HumanMessage(content=message, partner_id=partner_id)],
            partner_a_messages=[],
            partner_b_messages=[],
            relationship_id=relationship_id,
            relationship_stage=metadata.get("relationship_stage", "unknown"),
            relationship_duration=metadata.get("relationship_duration", 0),
            emotional_states={},
            emotional_patterns={},
            empathy_insights={},
            conflict_detected=False,
            conflict_style_a="unknown",
            conflict_style_b="unknown",
            anxiety_detected={"partner_a": False, "partner_b": False},
            safety_concern=False,
            communication_patterns={},
            relationship_insights={},
            growth_opportunities=[],
            response_mode="conversation",
            personalized_responses={},
            shared_insights=[],
            conversation_summary="",
            key_learnings=[],
            relationship_progress={}
        )
        
        # Process through the graph
        final_state = await self.graph.ainvoke(
            initial_state,
            config={"configurable": {"thread_id": relationship_id}}
        )
        
        return {
            "personalized_responses": final_state["personalized_responses"],
            "shared_insights": final_state["shared_insights"],
            "emotional_states": final_state["emotional_states"],
            "empathy_insights": final_state["empathy_insights"],
            "response_mode": final_state["response_mode"],
            "growth_opportunities": final_state["growth_opportunities"],
            "safety_concern": final_state["safety_concern"]
        }