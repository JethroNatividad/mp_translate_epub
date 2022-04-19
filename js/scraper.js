import axios from 'axios'
import { load } from 'cheerio'
import gbk from 'fast-gbk'

const { decode } = gbk()

async function getLinks(url) {
    const res = await axios.get(url, { responseType: 'arraybuffer' })
    const html = decode(res.data)
    const $ = load(html)
    const content = $('#chapterList')
    const links = content.find('a').map((i, element) => {
        return {
            href: $(element).attr('href'),
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

const links = await getLinks('https://www.uukanshu.com/b/439/')
console.log(links)