/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2021 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import * as React from 'react';

import { Spinner } from '../components/Spinner';
import { useIsMounted } from '../hooks/useIsMounted';
import { LayerRenderStatus } from '../structs/LayerRenderStatus';
import { WithScale } from './WithScale';
import type { PdfJs } from '../types/PdfJs';
import type { Plugin } from '../types/Plugin';

export const CanvasLayer: React.FC<{
    height: number;
    page: PdfJs.Page;
    pageIndex: number;
    plugins: Plugin[];
    rotation: number;
    scale: number;
    width: number;
}> = ({ height, page, pageIndex, plugins, rotation, scale, width }) => {
    const isMounted = useIsMounted();
    const canvasRef = React.useRef<HTMLCanvasElement>();
    const renderTask = React.useRef<PdfJs.PageRenderTask>();

    const [rendered, setRendered] = React.useState(false);

    // Support high DPI screen
    const devicePixelRatio = window.devicePixelRatio || 1;

    const renderCanvas = (): void => {
        setRendered(false);

        const task = renderTask.current;
        if (task) {
            task.cancel();
        }

        const canvasEle = canvasRef.current as HTMLCanvasElement;

        plugins.forEach((plugin) => {
            if (plugin.onCanvasLayerRender) {
                plugin.onCanvasLayerRender({
                    ele: canvasEle,
                    pageIndex,
                    rotation,
                    scale,
                    status: LayerRenderStatus.PreRender,
                });
            }
        });

        // Set the size for canvas here instead of inside `render`
        // to avoid the black flickering
        canvasEle.height = height * devicePixelRatio;
        canvasEle.width = width * devicePixelRatio;
        canvasEle.style.opacity = '0';

        const canvasContext = canvasEle.getContext('2d', {
            alpha: false,
        }) as CanvasRenderingContext2D;

        const viewport = page.getViewport({
            rotation,
            scale: scale * devicePixelRatio,
        });
        renderTask.current = page.render({ canvasContext, viewport });
        renderTask.current.promise.then(
            (): void => {
                isMounted.current && setRendered(true);
                canvasEle.style.removeProperty('opacity');
                plugins.forEach((plugin) => {
                    if (plugin.onCanvasLayerRender) {
                        plugin.onCanvasLayerRender({
                            ele: canvasEle,
                            pageIndex,
                            rotation,
                            scale,
                            status: LayerRenderStatus.DidRender,
                        });
                    }
                });
            },
            (): void => {
                isMounted.current && setRendered(true);
            }
        );
    };

    return (
        <WithScale callback={renderCanvas} rotation={rotation} scale={scale}>
            <div
                className="rpv-core__canvas-layer"
                style={{
                    height: `${height}px`,
                    width: `${width}px`,
                }}
            >
                {!rendered && (
                    <div className="rpv-core__canvas-layer-loader">
                        <Spinner />
                    </div>
                )}
                <canvas
                    ref={canvasRef}
                    style={{
                        transform: `scale(${1 / devicePixelRatio})`,
                        transformOrigin: `top left`,
                    }}
                />
            </div>
        </WithScale>
    );
};
