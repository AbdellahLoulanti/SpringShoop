
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { geminiService } from '../services/geminiService';

interface AIAssistantProps {
  productTitle: string;
}

const LoadingIcon = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const AIAssistant: React.FC<AIAssistantProps> = ({ productTitle }) => {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await geminiService.getProductRecommendations(productTitle);
        setRecommendations(result);
      } catch (err) {
        setError("Couldn't load AI recommendations.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (productTitle) {
      fetchRecommendations();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productTitle]);

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-8">
      <h3 className="text-lg font-semibold text-red-800 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707.707M12 21v-1m-4-4H5a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2zM19 13h-2a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2z" /></svg>
        AI Shopping Assistant
      </h3>
      <p className="text-sm text-red-700 mt-1">Inspired by this item? Try searching for:</p>
      
      <div className="mt-4">
        {loading && (
          <div className="flex items-center text-red-600">
            <LoadingIcon />
            <span>Generating ideas...</span>
          </div>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!loading && !error && (
          <div className="flex flex-wrap gap-2">
            {recommendations.map((rec, index) => (
              <Link
                key={index}
                to={`/search/${encodeURIComponent(rec)}`}
                className="bg-white text-red-600 border border-red-300 px-3 py-1 rounded-full text-sm hover:bg-red-100 hover:border-red-400 transition-colors"
              >
                {rec}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
