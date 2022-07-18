import React, { Suspense } from 'react';
import Wrapper from './Wrapper';

function AdManagement() {
  return (
    <>
      <Suspense fallback={<div>로딩</div>}>
        <Wrapper />
      </Suspense>
    </>
  );
}

export default AdManagement;
