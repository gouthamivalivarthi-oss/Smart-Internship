import React, { useState, useEffect } from 'react';
import { interviewApi, applicationApi } from '../services/api';
import InterviewCard from '../components/interviews/InterviewCard';
import ScheduleInterviewModal from '../components/interviews/ScheduleInterviewModal';
import InterviewQuestionsModal from '../components/ai/InterviewQuestionsModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import ThreeButton from '../components/3d/ThreeButton';
import { FiCalendar, FiPlus, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const InterviewsPage = () => {
  const [interviews, setInterviews] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedInterviewForQuestions, setSelectedInterviewForQuestions] = useState(null);

  const fetchInterviewsAndApps = async () => {
    try {
      setLoading(true);
      const [intRes, appRes] = await Promise.all([
        interviewApi.getAll(),
        applicationApi.getAll()
      ]);
      if (intRes.data.success) {
        setInterviews(intRes.data.interviews || []);
      }
      if (appRes.data.success) {
        setApplications(appRes.data.applications || []);
      }
    } catch (err) {
      toast.error('Failed to load interview data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviewsAndApps();
  }, []);

  const handleScheduleSubmit = async (formData) => {
    try {
      const res = await interviewApi.create(formData);
      if (res.data.success) {
        toast.success('Interview scheduled and AI questions generated!');
        setIsScheduleModalOpen(false);
        fetchInterviewsAndApps();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to schedule interview');
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await interviewApi.update(id, { status });
      if (res.data.success) {
        toast.success(`Marked as ${status}`);
        setInterviews(prev => prev.map(i => (i._id === id ? { ...i, status } : i)));
      }
    } catch (err) {
      toast.error('Failed to update interview');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this interview schedule?')) return;
    try {
      await interviewApi.delete(id);
      setInterviews(prev => prev.filter(i => i._id !== id));
      toast.success('Interview deleted');
    } catch (err) {
      toast.error('Failed to delete interview');
    }
  };

  const upcomingInterviews = interviews.filter(i => i.status === 'Scheduled');
  const pastInterviews = interviews.filter(i => i.status !== 'Scheduled');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-2xl bg-[#B9A7E8]/20 text-[#6C54A7] dark:text-[#B9A7E8] border border-[#B9A7E8]/35">
              <FiCalendar className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#3D2B24] dark:text-[#FFF8ED] tracking-tight">
              Interview Tracker & AI Prep
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 font-medium mt-1">
            Keep track of upcoming technical, behavioral, and system design rounds with 3D cards
          </p>
        </div>

        <ThreeButton
          onClick={() => setIsScheduleModalOpen(true)}
          variant="primary"
          className="rounded-2xl shadow-sm"
        >
          <FiPlus className="w-4 h-4 mr-1" />
          <span>Schedule Round</span>
        </ThreeButton>
      </div>

      {loading ? (
        <LoadingSpinner text="Loading interview schedule..." />
      ) : interviews.length === 0 ? (
        <EmptyState
          title="No interviews scheduled yet"
          description="Schedule an upcoming interview round and let AI generate realistic practice questions."
          actionLabel="Schedule Your First Interview"
          onAction={() => setIsScheduleModalOpen(true)}
        />
      ) : (
        <div className="space-y-8">
          {/* Upcoming Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-[#3D2B24] dark:text-[#FFF8ED]">
                Upcoming Rounds ({upcomingInterviews.length})
              </h2>
            </div>

            {upcomingInterviews.length === 0 ? (
              <p className="text-xs text-[#3D2B24]/50 dark:text-[#FFF8ED]/50 italic">No upcoming interviews at the moment.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingInterviews.map((interview) => (
                  <InterviewCard
                    key={interview._id}
                    interview={interview}
                    onViewQuestions={(item) => setSelectedInterviewForQuestions(item)}
                    onDelete={handleDelete}
                    onStatusUpdate={handleStatusUpdate}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Past / Completed Section */}
          {pastInterviews.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-[#F6EBDD] dark:border-[#553B30]">
              <h2 className="text-lg font-extrabold text-[#3D2B24] dark:text-[#FFF8ED]">
                Completed & Past Interviews ({pastInterviews.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-85">
                {pastInterviews.map((interview) => (
                  <InterviewCard
                    key={interview._id}
                    interview={interview}
                    onViewQuestions={(item) => setSelectedInterviewForQuestions(item)}
                    onDelete={handleDelete}
                    onStatusUpdate={handleStatusUpdate}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Schedule Modal */}
      <ScheduleInterviewModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSubmit={handleScheduleSubmit}
        applications={applications}
      />

      {/* AI Questions Modal */}
      {selectedInterviewForQuestions && (
        <InterviewQuestionsModal
          isOpen={!!selectedInterviewForQuestions}
          onClose={() => setSelectedInterviewForQuestions(null)}
          role={selectedInterviewForQuestions.role}
          company={selectedInterviewForQuestions.company}
          skills={selectedInterviewForQuestions.aiQuestions?.map(q => q.category) || []}
        />
      )}
    </div>
  );
};

export default InterviewsPage;
