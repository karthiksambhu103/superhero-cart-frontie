import { useState } from 'react';

function FeedbackForm({ onFeedbackSubmit }) {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();

    // Simulate feedback classification for demonstration purposes
    const classification = feedback.includes('good') || feedback.includes('great') || feedback.includes('fantastic') ||feedback.includes('amazing')
      ? 'Positive'
      : feedback.includes('bad') || feedback.includes('poor')
      ? 'Negative'
      : 'Neutral';

    // Call the function to pass the classification back to the BuyNow component
    onFeedbackSubmit(classification);
    
    // Reset the feedback input
    setFeedback('');
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Leave Feedback</h2>
      <form onSubmit={handleFeedbackSubmit}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows="5"
          cols="50"
          placeholder="Enter your feedback..."
          required
        />
        <br />
        <button type="submit" style={{ marginTop: '10px' }}>Submit Feedback</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
