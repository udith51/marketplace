import sanityClient from '@sanity/client'
import imageBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId: 'vme0ehir',
    dataset: 'production',
    apiVersion: '2022-03-10',
    useCdn: true,
    token: process.env.SANITY_TOKEN
})

const builder = imageBuilder(client);

export const urlFor = (source) => builder.image(source);