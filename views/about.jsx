import { Card } from "../cmps/card.jsx"

export function About() {
    const cards = [
        {
            name: 'Gal Zohar',
            title: 'Fullstack Developer',
            txt: 'I\'m a 27 from Oranit, Israel. I am a junior developer who learn Fullstack development at Coding Academy. My tools: JS including React,Angular and jQuery, HTML, CSS, C#, Java and SQL. I love diving, hiking and have a good time with may pets. I am looking to learn and grow as developer.',
            img: 'assets/img/dev/gal.jpg',
            contact: {
                facebook: 'https://www.facebook.com/profile.php?id=100077018276598',
                github: 'https://github.com/GalZohar4021',
                linkdin: 'https://www.linkedin.com/in/gal-zohar-aa0101184'
            }
        }
    ]
    
    return <section className="about">
        <span className="about-header">About our team</span>
        {
            cards.map(card => <Card key={card.name} dev={card} />)
        }
    </section>
}
