import React from 'react';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import Exception from '@/components/Exception';

const Exception500 = () => (
  <Exception
    backText={formatMessage({ id: 'app.exception.back' })}
    desc={formatMessage({ id: 'app.exception.description.500' })}
    linkElement={Link}
    type="500"
  />
);

export default Exception500;
