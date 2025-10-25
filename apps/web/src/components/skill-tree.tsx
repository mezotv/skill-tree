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
  occupation: string;
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
      "bg-gray-900/95 border-emerald-400/70", // Level 1
      "bg-gray-900/95 border-blue-400/70", // Level 2
      "bg-gray-900/95 border-amber-400/70", // Level 3
      "bg-gray-900/95 border-orange-400/70", // Level 4
      "bg-gray-900/95 border-rose-400/70", // Level 5
    ];
    return colors[level - 1] || colors[0];
  };

  // Calculate animation delay based on age
  const animationDelay = (data.age - 5) * 0.05; // Younger ages appear first

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div
        className="relative animate-in fade-in zoom-in"
        style={{
          animationDuration: "0.5s",
          animationDelay: `${animationDelay}s`,
          animationFillMode: "backwards",
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div
          className={`
            px-5 py-3 rounded-lg border-2 min-w-[160px] text-center
            ${getLevelColor(data.level)}
            ${
              data.completed
                ? "ring-1 ring-emerald-400 ring-offset-2 ring-offset-gray-950"
                : "hover:shadow-xl hover:-translate-y-0.5"
            }
            transition-all duration-200 cursor-pointer shadow-lg
          `}
        >
          <div className="font-medium text-gray-100 text-sm leading-snug">
            {data.description}
          </div>
        </div>

        {showTooltip && data.explanation && (
          <div className="absolute z-50 w-72 p-4 mt-2 text-xs bg-gray-900 border border-gray-700 rounded-xl shadow-xl left-1/2 transform -translate-x-1/2 pointer-events-none">
            <div className="font-semibold text-gray-100 mb-2">
              {data.description}
            </div>
            <div className="text-gray-300 leading-relaxed">
              {data.explanation}
            </div>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 border-l border-t border-gray-700 rotate-45"></div>
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
      <div
        className="text-base font-semibold text-gray-300 select-none text-right w-[120px] tracking-tight animate-in fade-in slide-in-from-left"
        style={{
          animationDuration: "0.6s",
          animationDelay: "0s",
          animationFillMode: "backwards",
        }}
      >
        {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </>
  );
};

// Custom node component for age labels
const AgeLabelComponent = ({ data }: { data: { label: string } }) => {
  return (
    <div
      className="text-xs text-gray-500 font-medium select-none text-center tracking-wide animate-in fade-in"
      style={{
        animationDuration: "0.4s",
        animationDelay: "0s",
        animationFillMode: "backwards",
      }}
    >
      {data.label}
    </div>
  );
};

// Custom node component for occupation (master node)
const OccupationNodeComponent = ({
  data,
}: {
  data: { occupation: string };
}) => {
  return (
    <>
      <div
        className="flex flex-col items-center gap-4 p-6 bg-linear-to-br from-purple-900/90 to-indigo-900/90 border-2 border-purple-400/70 rounded-2xl shadow-2xl min-w-[300px] animate-in fade-in zoom-in"
        style={{
          animationDuration: "0.8s",
          animationDelay: "1s",
          animationFillMode: "backwards",
        }}
      >
        <div className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-200 to-pink-200 tracking-tight text-center">
          {data.occupation}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

const nodeTypes: NodeTypes = {
  skill: SkillNodeComponent,
  schoolLabel: SchoolLabelComponent,
  ageLabel: AgeLabelComponent,
  occupation: OccupationNodeComponent,
};

// API function to fetch skill tree data
export const fetchSkillTreeData = async (
  job: string
): Promise<SkillTreeData> => {
  const response = await fetch("/api/ai/job", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ job }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch skill tree data: ${response.statusText}`);
  }

  const data = await response.json();
  return data as SkillTreeData;
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
    if (!data) {
      return { flowNodes: [], flowEdges: [] };
    }

    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Add school label nodes
    const schoolNodes: Array<{ id: string; y: number }> = [];
    data.schools.forEach((school, schoolIndex) => {
      const schoolSkills = data.skills.filter(
        (skill) => skill.school === school
      );
      if (schoolSkills.length > 0) {
        const minAge = Math.min(...schoolSkills.map((s) => s.age));
        const maxAge = Math.max(...schoolSkills.map((s) => s.age));
        const avgAge = (minAge + maxAge) / 2;
        const yPos = (18 - avgAge) * 80;

        nodes.push({
          id: `school-${schoolIndex}`,
          type: "schoolLabel",
          position: {
            x: -300, // Far left - before age timeline
            y: yPos, // Inverted: higher ages at top
          },
          data: {
            label: school,
          },
          draggable: false,
          selectable: false,
        });

        schoolNodes.push({ id: `school-${schoolIndex}`, y: yPos });
      }
    });

    // Sort school nodes by y position and connect them with timeline
    schoolNodes.sort((a, b) => a.y - b.y);
    for (let i = 0; i < schoolNodes.length - 1; i++) {
      edges.push({
        id: `school-timeline-${i}`,
        source: schoolNodes[i].id,
        target: schoolNodes[i + 1].id,
        type: "straight" as const,
        style: {
          stroke: "#374151",
          strokeWidth: 3,
        },
        animated: false,
      });
    }

    // Create age nodes for timeline
    const sortedAges = [...data.ages].sort((a, b) => b - a); // Sort descending (highest age at top)

    // Add age nodes to the timeline
    sortedAges.forEach((age, index) => {
      nodes.push({
        id: `age-${age}`,
        type: "ageLabel",
        position: {
          x: -150, // Between school labels and skill nodes
          y: (18 - age) * 80, // Inverted: higher ages at top
        },
        data: {
          label: `Age ${age}`,
        },
        draggable: false,
        selectable: false,
      });
    });

    // Add vertical edges between age nodes (connecting the timeline)
    for (let i = 0; i < sortedAges.length - 1; i++) {
      edges.push({
        id: `age-timeline-${i}`,
        source: `age-${sortedAges[i]}`,
        target: `age-${sortedAges[i + 1]}`,
        type: "straight" as const,
        style: {
          stroke: "#4b5563",
          strokeWidth: 2,
        },
        animated: false,
      });
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

    // Add occupation node at the top
    const maxAge = Math.max(...data.ages);
    const occupationY = (18 - maxAge) * 80 - 200; // Position above the highest age
    const centerX = ((data.subjects.length - 1) * 200) / 2; // Center of all subjects

    nodes.push({
      id: "occupation-master",
      type: "occupation",
      position: {
        x: centerX, // Center horizontally
        y: occupationY,
      },
      data: {
        occupation: data.occupation,
      },
      draggable: false,
      selectable: false,
    });

    // Connect occupation node to the highest age node in each subject
    data.subjects.forEach((subject) => {
      const subjectSkills = data.skills
        .filter((skill) => skill.subject === subject)
        .sort((a, b) => b.age - a.age); // Sort descending to get highest age first

      if (subjectSkills.length > 0) {
        const topSkill = subjectSkills[0];
        edges.push({
          id: `occupation-${topSkill.id}`,
          source: "occupation-master",
          target: topSkill.id,
          type: "default",
          animated: false,
          style: {
            stroke: "#a78bfa",
            strokeWidth: 2,
          },
        });
      }
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
          animated: false,
          style: {
            stroke: current.completed ? "#34d399" : "#4b5563",
            strokeWidth: 1.5,
          },
        });
      }
    });

    return { flowNodes: nodes, flowEdges: edges };
  }, [data]);

  // Create a stable key based on the data to force ReactFlow to remount when data changes
  const flowKey = useMemo(() => {
    if (!data) return "empty";
    return `${data.skills.length}-${data.subjects.join("-")}`;
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
    <div className="w-full h-[640px] bg-gray-950 rounded-lg">
      <ReactFlow
        key={flowKey}
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
        <Background variant={BackgroundVariant.Dots} color="#374151" gap={16} />
      </ReactFlow>
    </div>
  );
}
