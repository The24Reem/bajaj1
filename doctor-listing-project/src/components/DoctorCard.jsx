const DoctorCard = ({ doctor }) => {
  return (
    <div data-testid="doctor-card" className="border p-4 m-2 rounded">
      <div data-testid="doctor-name">{doctor.name}</div>
      <div data-testid="doctor-specialty">{doctor.speciality.join(', ')}</div>
      <div data-testid="doctor-experience">{doctor.experience} yrs exp.</div>
      <div data-testid="doctor-fee">₹ {doctor.fees}</div>
    </div>
  );
};

export default DoctorCard;