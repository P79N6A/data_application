import React from 'react';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import Exception from '@/components/Exception';

const Exception404 = () => (
  <Exception
      backText={formatMessage({ id: 'app.exception.back' })}
      desc={formatMessage({ id: 'app.exception.description.404' })}
      linkElement={Link}
      type="404"
  />
);

export default Exception404;
