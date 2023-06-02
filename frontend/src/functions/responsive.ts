import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function responsiveStyles() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const iconPadding = isSmallScreen ? '2px 4px' : '0px 0px';
  const paddingSize = isSmallScreen ? '2px 4px' : '6px 16px';
  const textSize = isSmallScreen ? '10px' : '14px';
  const gapSize = isSmallScreen ? 0 : 1;
  const margLeft = isSmallScreen ? 11 : 19;
  const navBarTextSize = isSmallScreen ? '12px' : '16px';
  const stockAndPriceWrap = isSmallScreen ? 'nowrap' : 'wrap';
  const stockAndPriceOverflow = isSmallScreen ? 'visible' : '';
  const navBarWidth = (open: boolean) => {
    let width = '';
    if (open && isSmallScreen) {
      width = '10em';
    } else if (open && !isSmallScreen) {
      width = '12em';
    } else if (!open && isSmallScreen) {
      width = '4em';
    } else {
      width = '6em';
    }
    return width;
  };
  const wholePageMarginLeft = (open: boolean) => {
    let margin = '';
    if (open && isSmallScreen) {
      margin = '5em';
    } else if (open && !isSmallScreen) {
      margin = '4em';
    } else {
      margin = '0em';
    }
    return margin;
  };

  return {
    iconPadding,
    paddingSize,
    textSize,
    gapSize,
    margLeft,
    navBarTextSize,
    navBarWidth,
    wholePageMarginLeft,
    stockAndPriceWrap,
    stockAndPriceOverflow,
  };
}
