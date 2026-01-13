"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { CalendarGrid, ExamCountdown, StudyPlanCard } from "@/components/calendar/CalendarComponents";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";

// Mock data
const mockEvents = [
    { id: "1", title: "Calculus Midterm", date: new Date(2026, 0, 20), type: 'exam' as const, courseCode: "MATH 201" },
    { id: "2", title: "Essay Due", date: new Date(2026, 0, 18), type: 'assignment' as const, courseCode: "ENG 101" },
    { id: "3", title: "Chemistry Lab Report", date: new Date(2026, 0, 22), type: 'assignment' as const, courseCode: "CHEM 201" },
    { id: "4", title: "Study Session", date: new Date(2026, 0, 16), type: 'study' as const, courseCode: "MATH 201" },
    { id: "5", title: "Physics Final", date: new Date(2026, 0, 28), type: 'exam' as const, courseCode: "PHYS 101" }
];

const mockExams = [
    { title: "Calculus Midterm", date: new Date(2026, 0, 20), courseCode: "MATH 201" },
    { title: "Physics Final", date: new Date(2026, 0, 28), courseCode: "PHYS 101" },
    { title: "Chemistry Final", date: new Date(2026, 1, 5), courseCode: "CHEM 201" }
];

const mockRecommendedNotes = [
    { id: "1", title: "Calculus Integration Formulas", courseCode: "MATH 201" },
    { id: "2", title: "Derivatives Quick Reference", courseCode: "MATH 201" },
    { id: "3", title: "Practice Problems Set 5", courseCode: "MATH 201" }
];

export default function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <main className="pt-24 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                                <CalendarIcon className="w-8 h-8 text-green-400" />
                                Study Calendar
                            </h1>
                            <p className="text-zinc-400 mt-2">Track exams, assignments, and study sessions</p>
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium bg-green-500 text-black hover:bg-green-400 transition-colors cursor-pointer"
                        >
                            <Plus className="w-5 h-5" />
                            Add Event
                        </motion.button>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Calendar */}
                        <div className="lg:col-span-2">
                            <CalendarGrid
                                events={mockEvents}
                                onDateSelect={setSelectedDate}
                            />
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <ExamCountdown exams={mockExams} />
                            <StudyPlanCard
                                notes={mockRecommendedNotes}
                                examTitle="Calculus Midterm"
                                daysUntil={6}
                            />
                        </div>
                    </div>

                    {/* Selected Date Events */}
                    {selectedDate && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 bg-zinc-900/60 backdrop-blur-md border border-white/5 rounded-2xl p-6"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4">
                                Events on {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                            </h3>
                            <div className="space-y-3">
                                {mockEvents
                                    .filter(e => e.date.toDateString() === selectedDate.toDateString())
                                    .map((event) => (
                                        <div
                                            key={event.id}
                                            className={`p-4 rounded-xl border ${event.type === 'exam'
                                                    ? 'bg-red-500/10 border-red-500/30'
                                                    : event.type === 'assignment'
                                                        ? 'bg-yellow-500/10 border-yellow-500/30'
                                                        : 'bg-green-500/10 border-green-500/30'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <span className="text-xs text-green-400 font-medium">{event.courseCode}</span>
                                                    <p className="font-medium text-white">{event.title}</p>
                                                </div>
                                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${event.type === 'exam'
                                                        ? 'bg-red-500/20 text-red-400'
                                                        : event.type === 'assignment'
                                                            ? 'bg-yellow-500/20 text-yellow-400'
                                                            : 'bg-green-500/20 text-green-400'
                                                    }`}>
                                                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                {mockEvents.filter(e => e.date.toDateString() === selectedDate.toDateString()).length === 0 && (
                                    <p className="text-zinc-500 text-sm">No events on this date</p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>
        </div>
    );
}
