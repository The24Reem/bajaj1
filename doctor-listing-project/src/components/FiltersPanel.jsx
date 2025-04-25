import React from 'react';
import { useSearchParams } from 'react-router-dom';

const specialtiesList = [
  "General Physician", "Dentist", "Dermatologist", "Paediatrician", "Gynaecologist",
  "ENT", "Diabetologist", "Cardiologist", "Physiotherapist", "Endocrinologist",
  "Orthopaedic", "Ophthalmologist", "Gastroenterologist", "Pulmonologist",
  "Psychiatrist", "Urologist", "Dietitian/Nutritionist", "Psychologist", "Sexologist",
  "Nephrologist", "Neurologist", "Oncologist", "Ayurveda", "Homeopath"
];

const FiltersPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParam = (key, value, isMulti) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (isMulti) {
      let values = newParams.getAll(key);
      if (values.includes(value)) {
        values = values.filter(v => v !== value);
      } else {
        values.push(value);
      }
      newParams.delete(key);
      values.forEach(v => newParams.append(key, v));
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="w-64">
      <h3 data-testid="filter-header-moc">Mode of Consultation</h3>
      <div>
        <label>
          <input
            type="radio"
            data-testid="filter-video-consult"
            onChange={() => updateParam('mode', 'video', false)}
            checked={searchParams.get('mode') === 'video'}
          />
          Video Consultation
        </label>
        <label>
          <input
            type="radio"
            data-testid="filter-in-clinic"
            onChange={() => updateParam('mode', 'inclinic', false)}
            checked={searchParams.get('mode') === 'inclinic'}
          />
          In-clinic Consultation
        </label>
      </div>

      <h3 data-testid="filter-header-speciality">Specialities</h3>
      <div>
        {specialtiesList.map(s => (
          <label key={s}>
            <input
              type="checkbox"
              data-testid={`filter-specialty-${s.replaceAll('/', '-').replaceAll(' ', '-')}`}
              checked={searchParams.getAll('specialty').includes(s)}
              onChange={() => updateParam('specialty', s, true)}
            />
            {s}
          </label>
        ))}
      </div>

      <h3 data-testid="filter-header-sort">Sort By</h3>
      <label>
        <input
          type="radio"
          data-testid="sort-fees"
          onChange={() => updateParam('sort', 'fees', false)}
          checked={searchParams.get('sort') === 'fees'}
        />
        Price: Low-High
      </label>
      <label>
        <input
          type="radio"
          data-testid="sort-experience"
          onChange={() => updateParam('sort', 'experience', false)}
          checked={searchParams.get('sort') === 'experience'}
        />
        Experience: Most Experience first
      </label>
    </div>
  );
};

export default FiltersPanel;