/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2021 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import * as React from 'react';
import { LocalizationContext, MenuItem } from '@react-pdf-viewer/core';

import { ZoomInIcon } from './ZoomInIcon';
import type { ZoomMenuItemProps } from './types/ZoomMenuItemProps';

export const ZoomInMenuItem: React.FC<ZoomMenuItemProps> = ({ onClick }) => {
    const { l10n } = React.useContext(LocalizationContext);
    const label = l10n && l10n.zoom ? l10n.zoom.zoomIn : 'Zoom in';

    return (
        <MenuItem icon={<ZoomInIcon />} testId="zoom__in-menu" onClick={onClick}>
            {label}
        </MenuItem>
    );
};
