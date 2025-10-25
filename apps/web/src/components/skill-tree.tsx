"use client";

import React, { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Handle,
  Position,
} from "reactflow";
import type {
  Node,
  Edge,
  Connection,
  EdgeChange,
  NodeChange,
  NodeTypes,
} from "reactflow";
import "reactflow/dist/style.css";

// Types for skill tree data
export interface SkillNode {
  id: string;
  subject: string;
  age: number;
  school: string;
  level: number; // 1-5 difficulty level
  completed: boolean;
  prerequisites?: string[];
  description?: string;
  explanation?: string; // Explanation of relevancy for the occupation
}

export interface SkillTreeData {
  subjects: string[];
  ages: number[];
  schools: string[];
  skills: SkillNode[];
}

// Custom node component for skills
const SkillNodeComponent = ({ data }: { data: SkillNode }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  const getLevelColor = (level: number) => {
    const colors = [
      "bg-green-100 border-green-300", // Level 1
      "bg-blue-100 border-blue-300", // Level 2
      "bg-yellow-100 border-yellow-300", // Level 3
      "bg-orange-100 border-orange-300", // Level 4
      "bg-red-100 border-red-300", // Level 5
    ];
    return colors[level - 1] || colors[0];
  };

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div
          className={`
            px-3 py-2 rounded-lg border-2 min-w-[120px] text-center text-sm font-medium
            ${getLevelColor(data.level)}
            ${data.completed ? "ring-2 ring-green-500" : "hover:shadow-md"}
            transition-all duration-200 cursor-pointer
          `}
        >
          <div className="font-semibold text-gray-800">{data.subject}</div>
          <div className="text-xs text-gray-500">Age {data.age}</div>
        </div>

        {showTooltip && data.explanation && (
          <div className="absolute z-50 w-64 p-3 mt-2 text-xs text-white bg-gray-900 rounded-lg shadow-lg left-1/2 transform -translate-x-1/2 pointer-events-none">
            <div className="font-semibold mb-1">{data.description}</div>
            <div className="text-gray-300">{data.explanation}</div>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

// Custom node component for school labels
const SchoolLabelComponent = ({ data }: { data: { label: string } }) => {
  return (
    <>
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <div className="text-lg font-bold text-gray-700 select-none">
        {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </>
  );
};

// Custom node component for age labels
const AgeLabelComponent = ({ data }: { data: { label: string } }) => {
  return (
    <div className="text-xs text-gray-500 italic select-none">{data.label}</div>
  );
};

const nodeTypes: NodeTypes = {
  skill: SkillNodeComponent,
  schoolLabel: SchoolLabelComponent,
  ageLabel: AgeLabelComponent,
};

// Placeholder API function
export const fetchSkillTreeData = async (): Promise<SkillTreeData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    subjects: ["Math", "Science", "Language", "History", "Art", "PE"],
    ages: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    schools: ["Elementary", "Middle School", "High School"],
    skills: [
      // Elementary Math
      {
        id: "math-5-1",
        subject: "Math",
        age: 5,
        school: "Elementary",
        level: 1,
        completed: true,
        description: "Basic counting",
        explanation:
          "Astronauts need strong foundational math skills to understand complex calculations later. Counting is the basis for all mathematical operations used in space missions and orbital mechanics.",
      },
      {
        id: "math-6-1",
        subject: "Math",
        age: 6,
        school: "Elementary",
        level: 1,
        completed: true,
        description: "Addition",
        explanation:
          "Addition helps astronauts combine quantities and understand cumulative effects. This skill is essential for calculating fuel consumption, mission duration, and resource management in space.",
      },
      {
        id: "math-7-1",
        subject: "Math",
        age: 7,
        school: "Elementary",
        level: 1,
        completed: true,
        description: "Subtraction",
        explanation:
          "Subtraction teaches astronauts to calculate differences and remaining resources. This is critical for monitoring oxygen levels, fuel reserves, and time remaining in spacewalks.",
      },
      {
        id: "math-8-1",
        subject: "Math",
        age: 8,
        school: "Elementary",
        level: 2,
        completed: false,
        description: "Multiplication",
        explanation:
          "Multiplication enables astronauts to scale calculations and understand exponential relationships. It's fundamental for computing velocities, accelerations, and orbital trajectories in space travel.",
      },
      {
        id: "math-9-1",
        subject: "Math",
        age: 9,
        school: "Elementary",
        level: 2,
        completed: false,
        description: "Division",
        explanation:
          "Division helps astronauts distribute resources and calculate rates. This skill is crucial for determining fuel efficiency, splitting tasks among crew members, and computing descent speeds during landing.",
      },

      // Elementary Science
      {
        id: "science-5-1",
        subject: "Science",
        age: 5,
        school: "Elementary",
        level: 1,
        completed: true,
        description: "Weather",
        explanation:
          "Understanding weather patterns introduces astronauts to atmospheric science and environmental systems. This knowledge is essential for predicting space weather, solar storms, and radiation that can affect spacecraft and crew safety.",
      },
      {
        id: "science-6-1",
        subject: "Science",
        age: 6,
        school: "Elementary",
        level: 1,
        completed: true,
        description: "Plants",
        explanation:
          "Studying plants teaches astronauts about life support systems and photosynthesis. Growing plants in space is crucial for long-term missions, providing oxygen, food, and psychological benefits to the crew.",
      },
      {
        id: "science-7-1",
        subject: "Science",
        age: 7,
        school: "Elementary",
        level: 2,
        completed: false,
        description: "Animals",
        explanation:
          "Learning about animals helps astronauts understand biological systems and adaptation. This knowledge is vital for studying how organisms, including humans, adapt to the extreme conditions of microgravity and space radiation.",
      },
      {
        id: "science-8-1",
        subject: "Science",
        age: 8,
        school: "Elementary",
        level: 2,
        completed: false,
        description: "Solar System",
        explanation:
          "Solar system knowledge is fundamental for astronauts to understand celestial mechanics and planetary science. It provides the context for mission planning, navigation, and exploration of other worlds beyond Earth.",
      },

      // Language Arts
      {
        id: "lang-5-1",
        subject: "Language",
        age: 5,
        school: "Elementary",
        level: 1,
        completed: true,
        description: "Alphabet",
        explanation:
          "The alphabet is the foundation for all written communication astronauts use daily. Clear communication is critical in space missions where precise instructions can mean the difference between mission success and catastrophic failure.",
      },
      {
        id: "lang-6-1",
        subject: "Language",
        age: 6,
        school: "Elementary",
        level: 1,
        completed: true,
        description: "Reading",
        explanation:
          "Reading skills enable astronauts to understand technical manuals, mission procedures, and scientific research. Astronauts must quickly comprehend complex instructions and emergency protocols to ensure crew safety and mission objectives.",
      },
      {
        id: "lang-7-1",
        subject: "Language",
        age: 7,
        school: "Elementary",
        level: 2,
        completed: false,
        description: "Writing",
        explanation:
          "Writing allows astronauts to document experiments, log mission activities, and communicate findings. Clear written reports are essential for recording scientific discoveries and sharing results with ground control and the global scientific community.",
      },
      {
        id: "lang-8-1",
        subject: "Language",
        age: 8,
        school: "Elementary",
        level: 2,
        completed: false,
        description: "Grammar",
        explanation:
          "Proper grammar ensures astronauts communicate precisely and avoid misunderstandings. In space missions, ambiguous communication can lead to errors in procedures, especially when working with international crews from different language backgrounds.",
      },

      // Middle School Math
      {
        id: "math-11-2",
        subject: "Math",
        age: 11,
        school: "Middle School",
        level: 3,
        completed: false,
        description: "Algebra",
        explanation:
          "Algebra teaches astronauts to solve equations and work with variables, essential for calculating orbital mechanics and trajectory adjustments. These skills are directly applied when determining spacecraft positions and velocities during complex space maneuvers.",
      },
      {
        id: "math-12-2",
        subject: "Math",
        age: 12,
        school: "Middle School",
        level: 3,
        completed: false,
        description: "Geometry",
        explanation:
          "Geometry helps astronauts understand spatial relationships and three-dimensional thinking crucial for docking procedures. Visualizing angles, distances, and shapes is vital when maneuvering spacecraft in zero-gravity environments and conducting spacewalks.",
      },
      {
        id: "math-13-2",
        subject: "Math",
        age: 13,
        school: "Middle School",
        level: 4,
        completed: false,
        description: "Statistics",
        explanation:
          "Statistics enables astronauts to analyze experimental data and assess risks during missions. Understanding probability and data analysis is critical for interpreting scientific results and making informed decisions about mission safety.",
      },

      // Middle School Science
      {
        id: "science-11-2",
        subject: "Science",
        age: 11,
        school: "Middle School",
        level: 3,
        completed: false,
        description: "Biology",
        explanation:
          "Biology teaches astronauts about human physiology and how the body functions in extreme environments. This knowledge is essential for understanding the effects of microgravity on muscles, bones, and the cardiovascular system during long-duration space missions.",
      },
      {
        id: "science-12-2",
        subject: "Science",
        age: 12,
        school: "Middle School",
        level: 3,
        completed: false,
        description: "Chemistry",
        explanation:
          "Chemistry helps astronauts understand chemical reactions and material properties in space conditions. This is crucial for managing life support systems, propellant chemistry, and conducting experiments in the unique environment of microgravity.",
      },
      {
        id: "science-13-2",
        subject: "Science",
        age: 13,
        school: "Middle School",
        level: 4,
        completed: false,
        description: "Physics",
        explanation:
          "Physics is fundamental for astronauts to understand forces, motion, and energy in space. It explains how rockets work, why objects float in orbit, and how to navigate using Newton's laws in the zero-friction environment of space.",
      },

      // High School Math
      {
        id: "math-14-3",
        subject: "Math",
        age: 14,
        school: "High School",
        level: 4,
        completed: false,
        description: "Pre-Calculus",
        explanation:
          "Pre-calculus prepares astronauts for advanced mathematical concepts used in orbital mechanics. Understanding functions, trigonometry, and exponential growth is essential for calculating spacecraft trajectories and analyzing mission data.",
      },
      {
        id: "math-15-3",
        subject: "Math",
        age: 15,
        school: "High School",
        level: 5,
        completed: false,
        description: "Calculus",
        explanation:
          "Calculus is the mathematical language of space flight, used to compute rates of change and optimize trajectories. Astronauts use differential equations to model rocket acceleration, orbital transfers, and fuel consumption during critical mission phases.",
      },
      {
        id: "math-16-3",
        subject: "Math",
        age: 16,
        school: "High School",
        level: 5,
        completed: false,
        description: "Advanced Math",
        explanation:
          "Advanced mathematics including linear algebra and differential equations enables astronauts to understand complex systems. These tools are used in navigation algorithms, control systems, and modeling the behavior of spacecraft under various conditions.",
      },

      // High School Science
      {
        id: "science-14-3",
        subject: "Science",
        age: 14,
        school: "High School",
        level: 4,
        completed: false,
        description: "Advanced Biology",
        explanation:
          "Advanced biology deepens understanding of cellular processes and genetics affected by space radiation. Astronauts study how cosmic rays impact DNA and how the immune system adapts to space, crucial for long-term missions to Mars.",
      },
      {
        id: "science-15-3",
        subject: "Science",
        age: 15,
        school: "High School",
        level: 5,
        completed: false,
        description: "Advanced Chemistry",
        explanation:
          "Advanced chemistry covers thermodynamics and reaction kinetics essential for rocket propulsion. Understanding combustion, fuel cells, and material science helps astronauts troubleshoot life support systems and develop new technologies for space exploration.",
      },
      {
        id: "science-16-3",
        subject: "Science",
        age: 16,
        school: "High School",
        level: 5,
        completed: false,
        description: "Advanced Physics",
        explanation:
          "Advanced physics including relativity and quantum mechanics explains extreme space phenomena. Astronauts use this knowledge to understand time dilation at high speeds, radiation shielding, and the fundamental forces governing the universe.",
      },
    ],
  };
};

interface SkillTreeProps {
  data?: SkillTreeData;
  onSkillClick?: (skill: SkillNode) => void;
}

export default function SkillTree({ data, onSkillClick }: SkillTreeProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Convert skill tree data to React Flow nodes and edges
  const { flowNodes, flowEdges } = useMemo(() => {
    if (!data) return { flowNodes: [], flowEdges: [] };

    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Create school nodes with their positions
    const schoolNodes: Array<{
      id: string;
      school: string;
      minAge: number;
      maxAge: number;
      position: { x: number; y: number };
    }> = [];

    data.schools.forEach((school, schoolIndex) => {
      const schoolSkills = data.skills.filter(
        (skill) => skill.school === school
      );
      if (schoolSkills.length > 0) {
        const minAge = Math.min(...schoolSkills.map((s) => s.age));
        const maxAge = Math.max(...schoolSkills.map((s) => s.age));
        const avgAge = (minAge + maxAge) / 2;

        schoolNodes.push({
          id: `school-${schoolIndex}`,
          school,
          minAge,
          maxAge,
          position: {
            x: -150, // Far left - fixed position for alignment
            y: (18 - avgAge) * 80, // Inverted: higher ages at top
          },
        });
      }
    });

    // Sort school nodes by position (top to bottom)
    schoolNodes.sort((a, b) => a.position.y - b.position.y);

    // Add school nodes to the flow
    schoolNodes.forEach((schoolNode) => {
      nodes.push({
        id: schoolNode.id,
        type: "schoolLabel",
        position: schoolNode.position,
        data: {
          label: schoolNode.school,
        },
        draggable: false,
        selectable: false,
      });
    });

    // Add age label nodes between schools
    for (let i = 0; i < schoolNodes.length - 1; i++) {
      const currentSchool = schoolNodes[i];
      const nextSchool = schoolNodes[i + 1];

      // Position age label in the middle between two schools
      const midY = (currentSchool.position.y + nextSchool.position.y) / 2;

      nodes.push({
        id: `age-label-${i}`,
        type: "ageLabel",
        position: {
          x: -150, // Same x as school labels for alignment
          y: midY,
        },
        data: {
          label: `Ages ${nextSchool.minAge}-${nextSchool.maxAge}`,
        },
        draggable: false,
        selectable: false,
      });
    }

    // Add vertical edges between school labels (top to bottom)
    for (let i = 0; i < schoolNodes.length - 1; i++) {
      const edge = {
        id: `school-timeline-${i}`,
        source: schoolNodes[i].id,
        target: schoolNodes[i + 1].id,
        type: "straight" as const,
        style: {
          stroke: "#6b7280",
          strokeWidth: 3,
          strokeDasharray: "8,4",
        },
        animated: false,
      };
      edges.push(edge);
    }

    // Add skill nodes
    data.skills.forEach((skill) => {
      nodes.push({
        id: skill.id,
        type: "skill",
        position: {
          x: data.subjects.indexOf(skill.subject) * 200, // Horizontal spacing by subject
          y: (18 - skill.age) * 80, // Inverted: higher ages at top
        },
        data: skill,
      });
    });

    // Create edges between consecutive ages for the same subject
    data.subjects.forEach((subject) => {
      const subjectSkills = data.skills
        .filter((skill) => skill.subject === subject)
        .sort((a, b) => a.age - b.age);

      for (let i = 0; i < subjectSkills.length - 1; i++) {
        const current = subjectSkills[i];
        const next = subjectSkills[i + 1];

        // Connect consecutive skills in the same subject
        edges.push({
          id: `${current.id}-${next.id}`,
          source: next.id,
          target: current.id,
          type: "straight",
          animated: current.completed,
          style: {
            stroke: current.completed ? "#10b981" : "#6b7280",
            strokeWidth: 2,
          },
        });
      }
    });

    return { flowNodes: nodes, flowEdges: edges };
  }, [data]);

  // Update nodes and edges when data changes
  React.useEffect(() => {
    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [flowNodes, flowEdges, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (onSkillClick) {
        onSkillClick(node.data as SkillNode);
      }
    },
    [onSkillClick]
  );

  if (!data) {
    return (
      <div className="w-full h-96 flex items-center justify-center border rounded-lg">
        <div className="text-gray-500">Loading skill tree...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[640px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
}
