import * as React from 'react';
import { findAllByTitle } from '@testing-library/dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { mockIsIntersecting } from '../../../test-utils/mockIntersectionObserver';
import { Viewer } from '@react-pdf-viewer/core';
import { searchPlugin } from '../src/index';
import type { SingleKeyword } from '../src/types/SingleKeyword';

const TestClearHighlights: React.FC<{
    fileUrl: Uint8Array;
    keywords: SingleKeyword[];
}> = ({ fileUrl, keywords }) => {
    const searchPluginInstance = searchPlugin();
    const { clearHighlights, highlight } = searchPluginInstance;

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    marginBottom: '16px',
                }}
            >
                <button style={{ marginRight: '8px' }} onClick={() => highlight(keywords)}>
                    Highlight keywords
                </button>
                <button style={{ marginRight: '8px' }} onClick={() => clearHighlights()}>
                    Clear highlights
                </button>
            </div>
            <div
                style={{
                    border: '1px solid rgba(0, 0, 0, .3)',
                    height: '720px',
                    width: '720px',
                }}
            >
                <Viewer fileUrl={fileUrl} plugins={[searchPluginInstance]} />
            </div>
        </div>
    );
};

test('clearHighlights() method', async () => {
    const keywords = [
        'text',
        {
            keyword: 'Boring',
            matchCase: true,
        },
    ];

    const { findByText, findByTestId, getByTestId } = render(
        <TestClearHighlights fileUrl={global['__MULTIPLE_PAGES_PDF__']} keywords={keywords} />
    );
    mockIsIntersecting(getByTestId('core__viewer'), true);

    const highlightButton = await screen.findByText('Highlight keywords');
    fireEvent.click(highlightButton);

    const page = await findByTestId('core__page-layer-1');
    mockIsIntersecting(page, true);

    await findByText('Simple PDF File 2');

    // Found 13 texts that match `PDF`
    let highlights = await findAllByTitle(page, 'text');
    expect(highlights.length).toEqual(13);

    // Click the `Clear highlights` button
    const clearButton = await screen.findByText('Clear highlights');
    fireEvent.click(clearButton);

    expect(page.querySelectorAll('.rpv-search__highlight').length).toEqual(0);
});
