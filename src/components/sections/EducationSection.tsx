"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

export function EducationSection() {
  return (
    <section id="education" className="py-24 relative bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading 
          title="Education & Accolades" 
        />

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-8 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <GraduationCap className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl text-blue-400 font-medium mb-2">B.E. in Electronics & Communication</h3>
              <div className="text-3xl font-bold mb-2">Atria Institute of Technology</div>
              <div className="text-white/60 mb-6">Bengaluru • Jun 2023 - 2027</div>
              <p className="text-white/70">
                Focusing on the intersection of hardware optimization and machine learning algorithms. 
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel p-8 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Award className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl text-purple-400 font-medium mb-2">Key Accolades</h3>
              
              <div className="space-y-6 mt-6">
                <div>
                  <div className="text-lg font-bold">Top 1% — Young Turks Achievement Test</div>
                  <p className="text-white/60 text-sm mt-1">Achieved a 94.15% score, demonstrating exceptional proficiency in Data Structures and Algorithms.</p>
                </div>
                <div>
                  <div className="text-lg font-bold">Student Contributor — GDSC</div>
                  <p className="text-white/60 text-sm mt-1">Google Developer Student Clubs: Earned core credentials in Generative AI and Cloud Computing methodologies.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
