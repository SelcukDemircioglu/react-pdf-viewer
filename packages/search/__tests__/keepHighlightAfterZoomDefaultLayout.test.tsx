import * as React from 'react';
import { findAllByTitle } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';

import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { mockIsIntersecting } from '../../../test-utils/mockIntersectionObserver';
import type { FlagKeyword } from '../src/types/FlagKeyword';

const TestKeepHighlight: React.FC<{
    fileUrl: Uint8Array;
    keyword: string | FlagKeyword;
}> = ({ fileUrl, keyword }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        toolbarPlugin: {
            searchPlugin: {
                keyword,
            },
        },
    });

    return (
        <div
            style={{
                border: '1px solid rgba(0, 0, 0, .3)',
                height: '50rem',
                width: '50rem',
            }}
        >
            <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
        </div>
    );
};

test('Keep highlighting after zooming', async () => {
    const keyword = 'document';

    const { findByTestId, getByTestId } = render(
        <TestKeepHighlight fileUrl={global['__OPEN_PARAMS_PDF__']} keyword={keyword} />
    );

    mockIsIntersecting(getByTestId('core__viewer'), true);

    let page = await findByTestId('core__page-layer-4');
    mockIsIntersecting(page, true);

    // Wait for the text layer to be rendered completely
    await findByTestId('core__text-layer-4');

    let highlights = await findAllByTitle(page, keyword);
    expect(highlights.length).toEqual(8);
    expect(highlights[0].getAttribute('title')).toEqual(keyword);
    expect(highlights[0]).toHaveClass('rpv-search__highlight');

    // Zoom the document
    const zoomOutButton = await findByTestId('zoom__out-button');
    fireEvent.click(zoomOutButton);

    page = await findByTestId('core__page-layer-5');
    mockIsIntersecting(page, true);
    await findByTestId('core__text-layer-5');

    highlights = await findAllByTitle(page, keyword);
    expect(highlights.length).toEqual(4);
    expect(highlights[0].getAttribute('title')).toEqual(keyword);
    expect(highlights[0]).toHaveClass('rpv-search__highlight');
});
