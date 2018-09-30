import React from 'react';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import Exception from '@/components/Exception';

const Exception403 = () => (
  <Exception
    backText={formatMessage({ id: 'app.exception.back' })}
    desc={formatMessage({ id: 'app.exception.description.403' })}
    linkElement={Link}
    type="403"
  />
);

export default Exception403;
