import { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { SideNav, TopNav } from '.';

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  [theme.breakpoints.up('md')]: {
    paddingLeft: 70,
    paddingRight: 5
  },
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%',
});
interface Props {
  children: any;
}
export const Layout = (props: Props) => {
  const { children } = props;

  const { pathname } = useLocation();
  const [openNav, setOpenNav] = useState(false);
  const handlePathnameChange = useCallback(() => {
    if (openNav) setOpenNav(false);
  }, [openNav]);

  useEffect(() => {
    handlePathnameChange();
  }, [pathname]);
  console.log(children.props);
  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav onClose={() => setOpenNav(false)} open={openNav} />
      <LayoutRoot>
        <LayoutContainer>{children}</LayoutContainer>
      </LayoutRoot>
    </>
  );
};
