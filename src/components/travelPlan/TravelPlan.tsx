import React from 'react';
import './TravelPlanStyles.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../common/Button';

const TravelPlan: React.FC = () => {
  const navigate = useNavigate();

  const handleOrganiseClick = () => {
    navigate('/organize');
  };

  return (
    <div className='organizeContainer'>
      <div className='organizeText'>Organise Travel Plan</div>
      <div className='divider'></div> {/* Add this line */}
      <Button onClick={handleOrganiseClick} className='organizeButton'>OrganiZe</Button>
    </div>
  );
};

export default TravelPlan;