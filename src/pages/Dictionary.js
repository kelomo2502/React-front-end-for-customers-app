import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import DefinitionSearch from '../components/DefinitionSearch';

const Dictionary = () => {
  return (
    <section className='flex justify-center'>
      <DefinitionSearch />
    </section>
  )
  
  
}

export default Dictionary