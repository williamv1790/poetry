
import { render } from '@testing-library/react-native';
import React from 'react';

import Loading from './show-loading';

describe('Loading', () => {
  it('should render successfully', () => {
    const { container } = render(<Loading />);
    expect(container).toBeTruthy();
  });
});
