import type {Plugin , RenderViewer} from '@react-pdf-viewer/core'

export interface PageThumbnailPluginProps {
    PageThumbnail: React.ReactElement;
}

export const pageThumbnailPlugin = (props: PageThumbnailPluginProps): Plugin => {
    const {PageThumbnail} = props;

    return {
        renderViewer: (renderProps: RenderViewer)=> {
            let {slot} = renderProps;
           
            slot.children = PageThumbnail;

            console.log('props on render', renderProps)
              slot.attrs = {...slot.attrs, className: 'pageCovers', style: {
                height: '100%', width: '100%', margin: 0, padding: 0
              }};
            slot.subSlot.attrs = { className: 'pageCovers', style: {
                height: '100%', width: '100%', margin: 0, padding: 0
              }};
            slot.subSlot.children = <></>;

            return slot;
        }
    }
}