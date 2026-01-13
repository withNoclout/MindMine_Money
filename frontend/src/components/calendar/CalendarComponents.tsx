"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, BookOpen, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface CalendarEvent {
    id: string;
    title: string;
    date: Date;
    type: 'exam' | 'assignment' | 'study';
    courseCode?: string;
}

interface CalendarGridProps {
    events?: CalendarEvent[];
    onDateSelect?: (date: Date) => void;
}

export function CalendarGrid({ events = [], onDateSelect }: CalendarGridProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const getEventsForDay = (day: number) => {
        return events.filter(event => {
            const eventDate = new Date(event.date);
            return (
                eventDate.getFullYear() === year &&
                eventDate.getMonth() === month &&
                eventDate.getDate() === day
            );
        });
    };

    const isToday = (day: number) => {
        const today = new Date();
        return (
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day
        );
    };

    const handleDateClick = (day: number) => {
        const date = new Date(year, month, day);
        setSelectedDate(date);
        onDateSelect?.(date);
    };

    // Generate calendar days
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        days.push(day);
    }

    return (
        <div className="bg-zinc-900/60 backdrop-blur-md border border-white/5 rounded-2xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                    {monthNames[month]} {year}
                </h2>
                <div className="flex items-center gap-2">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={prevMonth}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={nextMonth}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-zinc-500 py-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                    if (day === null) {
                        return <div key={`empty-${index}`} className="aspect-square" />;
                    }

                    const dayEvents = getEventsForDay(day);
                    const hasExam = dayEvents.some(e => e.type === 'exam');
                    const hasAssignment = dayEvents.some(e => e.type === 'assignment');

                    return (
                        <motion.button
                            key={day}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDateClick(day)}
                            className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-colors cursor-pointer ${isToday(day)
                                    ? 'bg-green-500 text-black font-bold'
                                    : selectedDate?.getDate() === day && selectedDate?.getMonth() === month
                                        ? 'bg-white/10 text-white'
                                        : 'hover:bg-white/5 text-zinc-300'
                                }`}
                        >
                            <span className="text-sm">{day}</span>
                            {/* Event Indicators */}
                            <div className="flex gap-0.5 mt-1">
                                {hasExam && <div className="w-1.5 h-1.5 rounded-full bg-red-400" />}
                                {hasAssignment && <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />}
                                {dayEvents.length > 0 && !hasExam && !hasAssignment && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                )}
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5 text-xs text-zinc-400">
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span>Exam</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span>Assignment</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span>Study</span>
                </div>
            </div>
        </div>
    );
}

interface ExamCountdownProps {
    exams: { title: string; date: Date; courseCode: string }[];
}

export function ExamCountdown({ exams }: ExamCountdownProps) {
    const sortedExams = [...exams].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const upcomingExams = sortedExams.slice(0, 3);

    const getDaysUntil = (date: Date) => {
        const now = new Date();
        const examDate = new Date(date);
        const diff = examDate.getTime() - now.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="bg-zinc-900/60 backdrop-blur-md border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-400" />
                Upcoming Exams
            </h3>

            <div className="space-y-3">
                {upcomingExams.length === 0 ? (
                    <p className="text-sm text-zinc-500">No upcoming exams</p>
                ) : (
                    upcomingExams.map((exam, i) => {
                        const daysUntil = getDaysUntil(exam.date);
                        const isUrgent = daysUntil <= 3;

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`p-4 rounded-xl border ${isUrgent
                                        ? 'bg-red-500/10 border-red-500/30'
                                        : 'bg-white/5 border-white/10'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <span className="text-xs text-green-400 font-medium">{exam.courseCode}</span>
                                        <p className="font-medium text-white">{exam.title}</p>
                                        <p className="text-xs text-zinc-400 mt-1">
                                            {new Date(exam.date).toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div className={`text-right ${isUrgent ? 'text-red-400' : 'text-zinc-400'}`}>
                                        <span className="text-2xl font-bold">{daysUntil}</span>
                                        <p className="text-xs">days</p>
                                    </div>
                                </div>
                                {isUrgent && (
                                    <div className="flex items-center gap-1 mt-2 text-xs text-red-400">
                                        <AlertCircle className="w-3 h-3" />
                                        <span>Study now!</span>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

interface StudyPlanCardProps {
    notes: { id: string; title: string; courseCode: string; thumbnail?: string }[];
    examTitle: string;
    daysUntil: number;
}

export function StudyPlanCard({ notes, examTitle, daysUntil }: StudyPlanCardProps) {
    return (
        <div className="bg-zinc-900/60 backdrop-blur-md border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-green-400" />
                    Study Plan
                </h3>
                <span className="text-xs text-zinc-500">{daysUntil} days until {examTitle}</span>
            </div>

            <p className="text-sm text-zinc-400 mb-4">Recommended notes based on your upcoming exam:</p>

            <div className="space-y-3">
                {notes.map((note, i) => (
                    <motion.div
                        key={note.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                    >
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400/20 to-emerald-600/20 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-green-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-white truncate group-hover:text-green-400 transition-colors">
                                {note.title}
                            </p>
                            <p className="text-xs text-zinc-500">{note.courseCode}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
