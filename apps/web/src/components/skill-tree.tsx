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
}

export interface SkillTreeData {
  subjects: string[];
  ages: number[];
  schools: string[];
  skills: SkillNode[];
}

// Custom node component for skills
const SkillNodeComponent = ({ data }: { data: SkillNode }) => {
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
        className={`
          px-3 py-2 rounded-lg border-2 min-w-[120px] text-center text-sm font-medium
          ${getLevelColor(data.level)}
          ${data.completed ? "ring-2 ring-green-500" : "hover:shadow-md"}
          transition-all duration-200
        `}
      >
        <div className="font-semibold text-gray-800">{data.subject}</div>
        <div className="text-xs text-gray-500">Age {data.age}</div>
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
      },
      {
        id: "math-6-1",
        subject: "Math",
        age: 6,
        school: "Elementary",
        level: 1,
        completed: true,
        description: "Addition",
      },
      {
        id: "math-7-1",
        subject: "Math",
        age: 7,
        school: "Elementary",
        level: 1,
        completed: true,
        description: "Subtraction",
      },
      {
        id: "math-8-1",
        subject: "Math",
        age: 8,
        school: "Elementary",
        level: 2,
        completed: false,
        description: "Multiplication",
      },
      {
        id: "math-9-1",
        subject: "Math",
        age: 9,
        school: "Elementary",
        level: 2,
        completed: false,
        description: "Division",
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
      },
      {
        id: "science-6-1",
        subject: "Science",
        age: 6,
        school: "Elementary",
        level: 1,
        completed: true,
        description: "Plants",
      },
      {
        id: "science-7-1",
        subject: "Science",
        age: 7,
        school: "Elementary",
        level: 2,
        completed: false,
        description: "Animals",
      },
      {
        id: "science-8-1",
        subject: "Science",
        age: 8,
        school: "Elementary",
        level: 2,
        completed: false,
        description: "Solar System",
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
      },
      {
        id: "lang-6-1",
        subject: "Language",
        age: 6,
        school: "Elementary",
        level: 1,
        completed: true,
        description: "Reading",
      },
      {
        id: "lang-7-1",
        subject: "Language",
        age: 7,
        school: "Elementary",
        level: 2,
        completed: false,
        description: "Writing",
      },
      {
        id: "lang-8-1",
        subject: "Language",
        age: 8,
        school: "Elementary",
        level: 2,
        completed: false,
        description: "Grammar",
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
      },
      {
        id: "math-12-2",
        subject: "Math",
        age: 12,
        school: "Middle School",
        level: 3,
        completed: false,
        description: "Geometry",
      },
      {
        id: "math-13-2",
        subject: "Math",
        age: 13,
        school: "Middle School",
        level: 4,
        completed: false,
        description: "Statistics",
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
      },
      {
        id: "science-12-2",
        subject: "Science",
        age: 12,
        school: "Middle School",
        level: 3,
        completed: false,
        description: "Chemistry",
      },
      {
        id: "science-13-2",
        subject: "Science",
        age: 13,
        school: "Middle School",
        level: 4,
        completed: false,
        description: "Physics",
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
      },
      {
        id: "math-15-3",
        subject: "Math",
        age: 15,
        school: "High School",
        level: 5,
        completed: false,
        description: "Calculus",
      },
      {
        id: "math-16-3",
        subject: "Math",
        age: 16,
        school: "High School",
        level: 5,
        completed: false,
        description: "Advanced Math",
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
      },
      {
        id: "science-15-3",
        subject: "Science",
        age: 15,
        school: "High School",
        level: 5,
        completed: false,
        description: "Advanced Chemistry",
      },
      {
        id: "science-16-3",
        subject: "Science",
        age: 16,
        school: "High School",
        level: 5,
        completed: false,
        description: "Advanced Physics",
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
          source: current.id,
          target: next.id,
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
