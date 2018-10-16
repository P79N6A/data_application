import React from 'react';
import Link from 'umi/link';
import Exception from '@/components/Exception';

export default () => (
  <Exception linkElement={Link}
      style={{ minHeight: 500, height: '100%' }}
      type="404"
  />
);
