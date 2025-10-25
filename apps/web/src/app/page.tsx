"use client";

import { useState, useEffect } from "react";
import SkillTree, {
  fetchSkillTreeData,
  type SkillTreeData,
  type SkillNode,
} from "@/components/skill-tree";

export default function Home() {
  const [skillTreeData, setSkillTreeData] = useState<SkillTreeData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);

  useEffect(() => {
    const loadSkillTree = async () => {
      try {
        const data = await fetchSkillTreeData("Astronaut");
        setSkillTreeData(data);
      } catch (error) {
        console.error("Failed to load skill tree:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSkillTree();
  }, []);

  const handleSkillClick = (skill: SkillNode) => {
    setSelectedSkill(skill);
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl mb-2">What do you want to be?</h1>
      {skillTreeData && (
        <>
          <h2 className="text-xl text-gray-600 mb-1">
            {skillTreeData.occupation} Career Path
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Click on any skill to see why it's important for becoming a{" "}
            {skillTreeData.occupation.toLowerCase()}
          </p>
        </>
      )}

      <section className="">
        {loading ? (
          <div className="w-full h-96 flex items-center justify-center">
            <div className="text-gray-500">Loading skill tree...</div>
          </div>
        ) : (
          <SkillTree
            data={skillTreeData || undefined}
            onSkillClick={handleSkillClick}
          />
        )}
      </section>

      {selectedSkill && (
        <section className="mt-6 rounded-lg border p-6 bg-linear-to-br from-blue-50 to-indigo-50">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {selectedSkill.subject}
              </h3>
              <p className="text-sm text-gray-600">
                {selectedSkill.description} • Age {selectedSkill.age} •{" "}
                {selectedSkill.school}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                selectedSkill.completed
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {selectedSkill.completed ? "Completed" : "Not Started"}
            </span>
          </div>
          <div className="border-t pt-3 mt-3">
            <h4 className="font-semibold text-gray-700 mb-2">
              Why this matters for astronauts:
            </h4>
            <p className="text-gray-700 leading-relaxed">
              {selectedSkill.explanation}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
