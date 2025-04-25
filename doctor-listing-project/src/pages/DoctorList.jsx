import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorCard from '../components/DoctorCard';
import FiltersPanel from '../components/FiltersPanel';
import AutocompleteSearch from '../components/AutocompleteSearch';
import { useSearchParams } from 'react-router-dom';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    axios.get('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json')
      .then(res => {
        setDoctors(res.data);
        localStorage.setItem("allDoctorNames", JSON.stringify(res.data.map(d => d.name)));
        applyFilters(res.data);
      });
  }, []);

  useEffect(() => {
    applyFilters(doctors);
  }, [searchParams]);

  const applyFilters = (data) => {
    const search = searchParams.get('search')?.toLowerCase();
    const specialties = searchParams.getAll('specialty');
    const mode = searchParams.get('mode');
    const sort = searchParams.get('sort');

    let filtered = [...data];

    if (search) {
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(search)
      );
    }

    if (specialties.length > 0) {
      filtered = filtered.filter(d =>
        specialties.some(s => d.speciality.includes(s))
      );
    }

    if (mode) {
      filtered = filtered.filter(d => d.mode === mode);
    }

    if (sort === 'fees') {
      filtered.sort((a, b) => a.fees - b.fees);
    } else if (sort === 'experience') {
      filtered.sort((a, b) => b.experience - a.experience);
    }

    setFilteredDoctors(filtered);
  };

  return (
    <div className="flex">
      <FiltersPanel />
      <div className="w-full">
        <AutocompleteSearch />
        <div>
          {filteredDoctors.map((doc, idx) => (
            <DoctorCard key={idx} doctor={doc} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;