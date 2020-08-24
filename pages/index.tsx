
import React, { useEffect } from 'react';

import { useRouter, Router } from 'next/router';




const index: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/register')
  }, []);

  return (
    <h1>main</h1>
  )
};

export default index;

// export const getStaticProps: GetStaticProps = async () => {

// }
