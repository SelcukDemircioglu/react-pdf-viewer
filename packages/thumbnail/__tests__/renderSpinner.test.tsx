import * as React from 'react';
import { render } from '@testing-library/react';
import { Viewer } from '@react-pdf-viewer/core';

import { mockIsIntersecting } from '../../../test-utils/mockIntersectionObserver';
import { thumbnailPlugin } from '../src';

const TestRenderSpinner: React.FC<{
    fileUrl: Uint8Array;
}> = ({ fileUrl }) => {
    const thumbnailPluginInstance = thumbnailPlugin({
        renderSpinner: () => <div className="custom-spinner" />,
    });
    const { Thumbnails } = thumbnailPluginInstance;

    return (
        <div
            style={{
                border: '1px solid rgba(0, 0, 0, 0.3)',
                display: 'flex',
                height: '100%',
            }}
        >
            <div
                style={{
                    borderRight: '1px solid rgba(0, 0, 0, 0.3)',
                    overflow: 'auto',
                    width: '30%',
                }}
            >
                <Thumbnails />
            </div>
            <div style={{ flex: 1 }}>
                <Viewer fileUrl={fileUrl} plugins={[thumbnailPluginInstance]} />
            </div>
        </div>
    );
};

test('Test renderSpinner option', async () => {
    const { findByLabelText, findByTestId, getByTestId } = render(
        <TestRenderSpinner fileUrl={global['__OPEN_PARAMS_PDF__']} />
    );

    const viewerEle = getByTestId('core__viewer');
    mockIsIntersecting(viewerEle, true);

    const thumbnailsContainer = await findByTestId('thumbnail__list');
    expect(thumbnailsContainer.querySelectorAll('.custom-spinner').length).toEqual(8);

    // Make the first two thumbnail items visible
    const thumbnailItems = Array.from(thumbnailsContainer.querySelectorAll('.rpv-thumbnail__container'));
    mockIsIntersecting(thumbnailItems[0], true);
    mockIsIntersecting(thumbnailItems[1], true);

    await findByLabelText('Thumbnail of page 1');
    await findByLabelText('Thumbnail of page 2');

    expect(thumbnailsContainer.querySelectorAll('.custom-spinner').length).toEqual(6);
});
