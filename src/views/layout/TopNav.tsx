
import { Avatar, Box, IconButton, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MenuOutlined } from '@mui/icons-material';
import { usePopover } from '@/hooks';
import { AccountPopover } from '.';
import noimage from '@/assets/images/profile.png';

interface topProps {
  onNavOpen: () => void;
}


export const TopNav = (props: topProps) => {
  const {
    onNavOpen,
  } = props;
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('md'));

  const accountPopover = usePopover();
  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: 'transparent',
          position: 'sticky',
          top: 0,
          width: '100%',
          py: 1,
          zIndex: (theme) => theme.zIndex.appBar
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"

        >
          <Stack alignItems="center" direction="row">
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <MenuOutlined color="primary" />
              </IconButton>
            )}
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="end"
            sx={{ flexGrow: 2, pl: 10 }}
          >
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{ cursor: 'pointer', width: 45, height: 45 }}
              src={noimage}
            />
          </Stack>
        </Stack>

      </Box>

      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};