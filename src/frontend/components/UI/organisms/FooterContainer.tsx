import React from 'react';
import Footer from '../molescules/Footer';
import { useRecoilValue } from 'recoil';
import { FooterVisibilityAtom } from '../../../recoil/atom/FooterVisibilityAtom';

function FooterContainer() {
  const FooterVisibility = useRecoilValue(FooterVisibilityAtom);

  return <Footer>{FooterVisibility == 1}</Footer>;
}

export default FooterContainer;
