import React, { useState, useEffect } from 'react';
import { internshipApi, applicationApi } from '../services/api';
import InternshipCard from '../components/internships/InternshipCard';
import InternshipFilter from '../components/internships/InternshipFilter';
import InternshipDetailModal from '../components/internships/InternshipDetailModal';
import AiMatchModal from '../components/ai/AiMatchModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { FiBriefcase } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const InternshipsPage = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [type, setType] = useState('All');
  const [sort, setSort] = useState('newest');

  // Modals state
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [aiMatchInternship, setAiMatchInternship] = useState(null);

  const fetchInternships = async () => {
    try {
      setLoading(true);
      const res = await internshipApi.getAll({
        keyword: search || undefined,
        category: category !== 'All' ? category : undefined,
        type: type !== 'All' ? type : undefined,
        sort
      });
      if (res.data.success) {
        setInternships(res.data.internships || []);
      }
    } catch (err) {
      toast.error('Failed to load internships');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchInternships();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, category, type, sort]);

  const handleTrackInternship = async (internship) => {
    try {
      const res = await applicationApi.create({
        internshipId: internship._id,
        status: 'Applied'
      });
      if (res.data.success) {
        toast.success(`Tracked ${internship.title} at ${internship.company}!`);
        if (selectedInternship) setSelectedInternship(null);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to track internship');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="p-2.5 rounded-2xl bg-[#E9785B]/15 text-[#C85C45] dark:text-[#F5B895] border border-[#E9785B]/30">
            <FiBriefcase className="w-5 h-5" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#3D2B24] dark:text-[#FFF8ED] tracking-tight">
            Internship Directory
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 font-medium mt-1">
          Explore curated tech internships from high-growth startups to Fortune 500 enterprises with 3D cards
        </p>
      </div>

      {/* Filter component */}
      <InternshipFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        type={type}
        setType={setType}
        sort={sort}
        setSort={setSort}
      />

      {/* Internships Grid */}
      {loading ? (
        <LoadingSpinner text="Searching open positions..." />
      ) : internships.length === 0 ? (
        <EmptyState
          title="No internships match your filters"
          description="Try broadening your search keyword or clearing location and category filters."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearch('');
            setCategory('All');
            setType('All');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((internship) => (
            <InternshipCard
              key={internship._id}
              internship={internship}
              onViewDetails={(item) => setSelectedInternship(item)}
              onCheckAiMatch={(item) => setAiMatchInternship(item)}
              onApplyOrTrack={handleTrackInternship}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedInternship && (
        <InternshipDetailModal
          isOpen={!!selectedInternship}
          onClose={() => setSelectedInternship(null)}
          internship={selectedInternship}
          onTrack={handleTrackInternship}
          onCheckAiMatch={(item) => {
            setSelectedInternship(null);
            setAiMatchInternship(item);
          }}
        />
      )}

      {/* AI Match Modal */}
      {aiMatchInternship && (
        <AiMatchModal
          isOpen={!!aiMatchInternship}
          onClose={() => setAiMatchInternship(null)}
          internship={aiMatchInternship}
          onTrack={handleTrackInternship}
        />
      )}
    </div>
  );
};

export default InternshipsPage;
