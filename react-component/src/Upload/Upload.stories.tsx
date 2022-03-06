import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import UploadStory from '.';
import {action} from "@storybook/addon-actions";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Upload',
    component: UploadStory,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof UploadStory>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UploadStory> = (args) => <UploadStory {...args} />;

export const Primary = Template.bind({
    onSuccess: action("success"),
    onProgress: action("progress"),
    onError: action("error"),
});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
};
