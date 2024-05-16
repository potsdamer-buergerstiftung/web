'use client';

import React from "react";
import { RicosViewer } from "ricos-viewer";
import { pluginVideo } from "wix-rich-content-plugin-video/viewer";
import { pluginAudio } from "wix-rich-content-plugin-audio/viewer";
import { pluginDivider } from "wix-rich-content-plugin-divider/viewer";
import { pluginHtml } from "wix-rich-content-plugin-html/viewer";
import { pluginLink } from "wix-rich-content-plugin-link/viewer";
import { pluginLinkPreview } from "wix-rich-content-plugin-link-preview/viewer";
import { pluginImage } from "wix-rich-content-plugin-image/viewer";
import { pluginTable } from "wix-rich-content-plugin-table/viewer";
import { pluginGallery } from "wix-rich-content-plugin-gallery/viewer";
import { pluginGiphy } from "wix-rich-content-plugin-giphy/viewer";
import { pluginActionButton } from "wix-rich-content-plugin-button/viewer";
import { pluginHashtag } from "wix-rich-content-plugin-hashtag/viewer";
import { pluginVerticalEmbed } from "wix-rich-content-plugin-vertical-embed/viewer";
import { pluginCodeBlock } from "wix-rich-content-plugin-code-block/viewer";
import { pluginMentions } from "wix-rich-content-plugin-mentions/viewer";
import { pluginFileUpload } from "wix-rich-content-plugin-file-upload/viewer";
import { pluginCollapsibleList } from "wix-rich-content-plugin-collapsible-list/viewer";
import { pluginPoll } from "wix-rich-content-plugin-social-polls/viewer";
import { pluginSpoiler } from "wix-rich-content-plugin-spoiler/viewer";
import { pluginHeadings } from "wix-rich-content-plugin-headings/viewer";
import {
    pluginTextColor,
    pluginTextHighlight,
} from "wix-rich-content-plugin-text-color/viewer";

const plugins = [
    pluginVideo(),
    pluginAudio(),
    pluginDivider(),
    pluginHtml(),
    pluginLink(),
    pluginLinkPreview(),
    pluginImage(),
    pluginTable(),
    pluginGallery(),
    pluginGiphy(),
    pluginActionButton(),
    pluginHashtag(),
    pluginVerticalEmbed(),
    pluginCodeBlock(),
    pluginMentions(),
    pluginFileUpload(),
    pluginCollapsibleList(),
    pluginPoll(),
    pluginTextColor(),
    pluginTextHighlight(),
    pluginSpoiler(),
    pluginHeadings(),
];

const RichContentViewer = ({ content }) => {
    return <RicosViewer content={content} plugins={plugins} />;
};
export default RichContentViewer;
