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
    <div className="w-full">
      <h1 className="text-4xl">What do you want to be?</h1>
      <h2 className="text-xl text-gray-600 mb-6">
        (or what are your interests)
      </h2>

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
    </div>
  );
}
