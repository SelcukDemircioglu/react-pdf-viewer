/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2021 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import * as React from 'react';
import { LocalizationContext, MenuItem } from '@react-pdf-viewer/core';

import { NextIcon } from './NextIcon';
import type { RenderGoToPageProps } from './types/index';

export const GoToNextPageMenuItem: React.FC<RenderGoToPageProps> = ({ isDisabled, onClick }) => {
    const { l10n } = React.useContext(LocalizationContext);
    const label = l10n && l10n.pageNavigation ? l10n.pageNavigation.goToNextPage : 'Next page';

    return (
        <MenuItem icon={<NextIcon />} isDisabled={isDisabled} testId="page-navigation__next-menu" onClick={onClick}>
            {label}
        </MenuItem>
    );
};
