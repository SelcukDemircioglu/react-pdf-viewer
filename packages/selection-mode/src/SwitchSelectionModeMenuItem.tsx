/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2021 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import * as React from 'react';
import { MenuItem } from '@react-pdf-viewer/core';

import { SwitchSelectionModeDecorator } from './SwitchSelectionModeDecorator';
import { SelectionMode } from './structs/SelectionMode';
import { RenderSwitchSelectionModeProps } from './types/RenderSwitchSelectionModeProps';

export const SwitchSelectionModeMenuItem: React.FC<RenderSwitchSelectionModeProps> = ({
    isSelected,
    mode,
    onClick,
}) => {
    let testId = '';
    switch (mode) {
        case SelectionMode.Hand:
            testId = 'selection-mode__hand-menu';
            break;
        case SelectionMode.Text:
        default:
            testId = 'selection-mode__text-menu';
    }

    return (
        <SwitchSelectionModeDecorator mode={mode} onClick={onClick}>
            {(props) => (
                <MenuItem checked={isSelected} icon={props.icon} testId={testId} onClick={props.onClick}>
                    {props.label}
                </MenuItem>
            )}
        </SwitchSelectionModeDecorator>
    );
};
