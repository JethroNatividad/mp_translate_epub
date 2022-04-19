import axios from 'axios'
import { load } from 'cheerio'
import gbk from 'fast-gbk'
import { cleanup } from './lib.js'

const { decode } = gbk()

export async function getLinks(url) {
    // get baseUrl of url
    const Url = new URL(url)
    const res = await axios.get(url, { responseType: 'arraybuffer' })
    const html = decode(res.data)
    const $ = load(html)
    const content = $('#chapterList')
    const links = content.find('a').map((i, element) => {
        return {
            href: `${Url.origin}${$(element).attr('href')}`,
            text: $(element).text()
        }
        // check if text match this pattern "Chapter any number"
        // if ($(element).text().match(/第\s\d+/)) {
        //     return {
        //         href: $(element).attr('href'),
        //         text: $(element).text()
        //     }
        // }
    }
    ).get()
    return links
    // 'text', 'href'

}

// const links = await getLinks('https://www.uukanshu.com/b/439/')
// console.log(links)


export const getContent = async (url) => {
    const Url = new URL(url)
    const res = await axios.get(url, { responseType: 'arraybuffer' })
    const html = decode(res.data)
    const $ = load(html)
    const nextLink = $('#next')
    const content = $('.uu_cont').html()

    const text = cleanup(content)
    return {
        content: text,
        nextLink: `${Url.origin}${nextLink.attr('href')}`
    }
}

// const content = await getContent('https://www.uukanshu.com/b/439/382388.html')
// console.log(content)