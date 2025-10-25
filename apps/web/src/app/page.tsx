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
        const data = await fetchSkillTreeData();
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
    <div className="container mx-auto max-w-7xl px-4 py-2">
      <h1 className="text-4xl">What do you want to be?</h1>
      <h2 className="text-xl text-gray-600 mb-6">
        (or what are your interests)
      </h2>

      <div className="grid gap-6">
        <section className="rounded-lg border p-4">
          <h2 className="mb-4 font-medium text-lg">Educational Skill Tree</h2>
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
          <section className="rounded-lg border p-4 bg-blue-50">
            <h3 className="font-medium text-lg mb-2">Selected Skill</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Subject:</strong> {selectedSkill.subject}
                </p>
                <p>
                  <strong>Age:</strong> {selectedSkill.age}
                </p>
              </div>
              <div>
                <p>
                  <strong>Level:</strong> {selectedSkill.level}/5
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {selectedSkill.completed ? "Completed" : "Not Started"}
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
