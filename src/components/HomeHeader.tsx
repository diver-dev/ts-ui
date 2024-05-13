// material
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import BackIcon from '@mui/icons-material/ArrowBackRounded';
import SvgDehaze from '@mui/icons-material/DehazeRounded';
import NotificationsIcon from '@mui/icons-material/NotificationsRounded';
import SearchIcon from '@mui/icons-material/SearchRounded';
import HomeIcon from '@mui/icons-material/HomeRounded';
import ProfileIcon from '@mui/icons-material/AssignmentIndRounded';
import SettingIcon from '@mui/icons-material/SettingsRounded';
import classNames from 'classnames';
import Notify from 'components/notify';
import SearchBoxComponent from 'components/SearchBox';
import EditProfile from 'components/editProfile/EditProfileComponent';
import queryString from 'query-string';
import { useTranslation } from 'react-i18next';
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';
import { Theme } from '@mui/material/styles/createTheme';
import Divider from '@mui/material/Divider';
import { makeStyles, createStyles } from '@mui/styles';
//
import { NavLink, useLocation, useNavigate, Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import TelarSocialLogo from 'oldComponents/telarSocialLogoWhite';
import PostWrite from 'components/postWrite';
import Button, { ButtonProps } from '@mui/material/Button';
import { notificationSelector } from 'redux/reducers/notifications/notificationSelector';
import { authorizeSelector } from 'redux/reducers/authorize/authorizeSelector';
import { globalSelector } from 'redux/reducers/global/globalSelector';
import { userSelector } from 'redux/reducers/users/userSelector';
import { Map } from 'immutable';
import { experimentalStyled as styled } from '@mui/material/styles';
import { DialogType } from 'models/common/dialogType';
import Typography from '@mui/material/Typography';
import MyAvatar from 'components/MyAvatar';
import { PATH_MAIN } from 'routes/paths';
import { useSelector } from 'redux/store';
import useAuth from 'hooks/useAuth';
import React, { useCallback } from 'react';

// ----------------------------------------------------------------------

const LogoutButton = styled('div')({
    padding: '16px 16px 6px',
});

const VerticalSpace = styled('div')({
    height: 10,
});

const UserMenu = styled('div')({
    marginBottom: '12px',
    paddingLeft: '20px',
    paddingRight: '20px',
});

const UserMenuButton = styled(Button)<ButtonProps>(({ theme }) => ({
    textTransform: 'capitalize',
    paddingLeft: 20,
    color: theme.palette.text.primary,
    justifyContent: 'flex-start',
}));

const generateLink = ({ to }: { to: string }) =>
    // eslint-disable-next-line react/display-name
    React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((props, ref) => <RouterLink ref={ref} to={to} {...props} />);
// ----------------------------------------------------------------------

// selectors
const selectNotificationsCount = notificationSelector.selectNotificationsCount();
const selectCurrentUser = authorizeSelector.selectCurrentUser();
const selectHeaderTitle = globalSelector.selectHeaderTitle();
const selectOpenEditProfile = userSelector.selectOpenEditProfile();
const selectDialogState = globalSelector.selectDialogState();

export interface HomeHeaderProps {
    onToggleDrawer: () => void;
}

export default function HomeHeader(props: HomeHeaderProps) {
    const location = useLocation();
    const { t } = useTranslation();
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const { logout } = useAuth();

    // state
    const [openAvatarMenu, setOpenAvatarMenu] = React.useState(false);
    const [openNotifyMenu, setOpenNotifyMenu] = React.useState(false);
    const [isSearchPage, setIsSearchPage] = React.useState(true);
    const [previousLocation, setPreviousLocation] = React.useState('');
    const [anchorElNotify, setAnchorElNotify] = React.useState(null);
    const [anchorElAvatar, setAnchorElAvatar] = React.useState(null);

    // Selectors
    const notifyCount = useSelector((state: Map<string, any>) => selectNotificationsCount(state));
    const currentUser = useSelector((state: Map<string, any>) => selectCurrentUser(state));
    const title = useSelector((state: Map<string, any>) => selectHeaderTitle(state)) as string;
    const myProfileAccountOpen = useSelector((state: Map<string, any>) => selectOpenEditProfile(state as never));
    const postWriteOpen = useSelector((state: Map<string, any>) =>
        selectDialogState(state, { type: DialogType.PostWrite }),
    );

    /**
     * Handle close notification menu
     */
    const handleCloseNotify = () => {
        setAnchorElNotify(null);
        setOpenNotifyMenu(false);
    };

    /**
     * Handle close avatar menu
     */
    const handleCloseAvatarMenu = () => {
        setAnchorElAvatar(null);
        setOpenAvatarMenu(false);
    };

    // On click toggle sidebar
    const onToggleSidebar = () => {
        const { onToggleDrawer } = props;
        onToggleDrawer();
    };

    /**
     * Handle notification touch
     */
    const handleNotifyTouchTap = (event: any) => {
        // This prevents ghost click.
        event.preventDefault();

        setOpenNotifyMenu(true);
        setAnchorElNotify(event.currentTarget);
    };

    /**
     * Handle notification touch
     */
    const handleAvatarTouchTap = (event: any) => {
        // This prevents ghost click.
        event.preventDefault();

        setOpenAvatarMenu(true);
        setAnchorElAvatar(event.currentTarget);
    };

    /**
     * Handle logout user
     */
    const handleLogout = () => {
        logout();
    };

    /**
     * Handle search
     */
    const handleSearch = () => {
        navigate('/search?q=');
    };

    /**
     * Check page location
     */
    const checkPageLocation = useCallback((nextLocation: any) => {
        const nextParams: { q: string } = queryString.parse(nextLocation.search) as any;
        const params: { q: string } = queryString.parse(location.search) as any;
        const isPreviousSearch = params !== undefined && params.q !== undefined;

        setIsSearchPage(nextParams !== undefined && nextParams.q !== undefined);

        if (!isPreviousSearch) {
            setPreviousLocation(location.pathname);
        }
    },[location.pathname, location.search])
    /**
     * Handle mouse down prevent default
     */
    const handleMouseDown = (event: any) => {
        event.preventDefault();
    };

    React.useEffect(() => {
        checkPageLocation(location);
    }, [checkPageLocation, location]);

    const anchor = theme.direction === 'rtl' ? 'right' : 'left';
    const smUpHidden = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
    const smDownHidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    const rightHeader = (
        <div className="homeHeader__right">
            <IconButton
                onClick={handleSearch}
                onMouseDown={handleMouseDown}
                className={classes.searchButton}
                style={{ display: smUpHidden ? 'none' : 'block' }}
            >
                <SearchIcon style={{ color: theme.palette.common.white }} />
            </IconButton>

            {/* Notification */}

            <Tooltip title={t('header.notificationTooltip') as string}>
                <IconButton onClick={handleNotifyTouchTap}>
                    <Badge badgeContent={notifyCount} color="error">
                        <NotificationsIcon style={{ color: theme.palette.common.white }} />
                    </Badge>
                </IconButton>
            </Tooltip>

            <Notify open={openNotifyMenu} anchorEl={anchorElNotify} onClose={handleCloseNotify} />

            {/* User avatar */}
            <MyAvatar onClick={handleAvatarTouchTap} size={32} className={classes.avatar} />

            <Menu
                open={openAvatarMenu}
                anchorEl={anchorElAvatar}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                onClose={handleCloseAvatarMenu}
                sx={{ '& .MuiPaper-root': { width: 220 } }}
            >
                <UserMenu>
                    <Typography sx={{ textTransform: 'capitalize' }} variant="subtitle1" color="inherit" noWrap>
                        {currentUser.get('fullName')}
                    </Typography>
                    <Typography variant="body2" color="inherit" noWrap>
                        {currentUser.get('email')}
                    </Typography>
                </UserMenu>
                <Divider />
                <VerticalSpace />
                <UserMenuButton
                    startIcon={<HomeIcon />}
                    LinkComponent={generateLink({ to: PATH_MAIN.user.home })}
                    color="primary"
                    href="/"
                    fullWidth
                >
                    {t('sidebar.home')}
                </UserMenuButton>
                <UserMenuButton
                    startIcon={<ProfileIcon />}
                    color="primary"
                    LinkComponent={generateLink({
                        to: PATH_MAIN.user.profile.replace(':socialName', currentUser.get('socialName')),
                    })}
                    href={PATH_MAIN.user.profile.replace(':socialName', currentUser.get('socialName'))}
                    fullWidth
                >
                    {t('header.editProfile')}
                </UserMenuButton>
                <UserMenuButton
                    startIcon={<SettingIcon />}
                    LinkComponent={generateLink({ to: PATH_MAIN.user.account })}
                    href={PATH_MAIN.user.account}
                    color="primary"
                    fullWidth
                >
                    {t('sidebar.account')}
                </UserMenuButton>
                <LogoutButton>
                    <Button onClick={handleLogout} color="primary" fullWidth variant="outlined">
                        {t('header.logout')}{' '}
                    </Button>
                </LogoutButton>
            </Menu>
            {myProfileAccountOpen ? (
                <EditProfile
                    avatar={currentUser.get('avatar', '')}
                    banner={currentUser.get('banner', '')}
                    fullName={currentUser.get('fullName', '')}
                />
            ) : (
                ''
            )}
        </div>
    );

    return (
        <AppBar className={classes.appBar} position="fixed">
            <>
                <Toolbar>
                    {/* Left side */}
                    {!isSearchPage ? (
                        <IconButton onClick={onToggleSidebar}>
                            <SvgDehaze style={{ cursor: 'pointer', color: theme.palette.common.white }} />
                        </IconButton>
                    ) : (
                        <NavLink to={previousLocation}>
                            <IconButton>
                                <BackIcon style={{ cursor: 'pointer', color: theme.palette.common.white }} />
                            </IconButton>
                        </NavLink>
                    )}

                    {/* Header title */}
                    {smDownHidden && isSearchPage ? '' : <TelarSocialLogo className={classes.appIcon} />}

                    <div className="homeHeader__title-root">
                        <Grid
                            className={classNames(classes.pageTitle, {
                                'homeHeader__title-left': anchor === 'left',
                                'homeHeader__title-right': anchor === 'right',
                            })}
                            style={{ display: smDownHidden ? 'none' : 'block' }}
                        >
                            {title}
                        </Grid>
                    </div>
                    <div className={classes.fullBox}>
                        <div className={classes.searchBox} style={{ display: smDownHidden ? 'none' : 'block' }}>
                            <SearchBoxComponent />
                        </div>

                        {smDownHidden && isSearchPage ? (
                            <div className={classes.smallSearchBox}>
                                <SearchBoxComponent />
                            </div>
                        ) : (
                            ''
                        )}
                    </div>

                    {smDownHidden && isSearchPage ? '' : rightHeader}
                </Toolbar>
                {postWriteOpen && <PostWrite />}
            </>
        </AppBar>
    );
}

// ----------------------------------------------------------------------

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: '#a5792a',
        },
        flex: {
            flex: 1,
        },
        avatar: {
            margin: 5,
            cursor: 'pointer',
        },
        pageTitle: {
            color: theme.palette.common.white,
            borderLeftColor: theme.palette.common.white,
        },
        appIcon: {
            height: '40px !important',
            width: '40px !important',
            'margin-left': '10px !important',
        },
        searchBox: {},
        fullBox: {
            flex: 1,
        },
        searchButton: {
            color: 'rgb(255, 255, 255)',
        },
        smallSearchBox: {
            marginRight: 25,
        },
        appBar: {
            'z-index': `${theme.zIndex.drawer + 1} !important`,
        },
    }),
);
