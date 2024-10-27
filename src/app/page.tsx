'use client'

import { useRef, useState, forwardRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDownIcon, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-sm shadow-md' : 'bg-background/50 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            PersonalCoach
          </Link>

          <div className="flex items-center space-x-8">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className="text-foreground hover:text-primary transition-colors text-shadow"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            <Button className="hidden md:inline-flex" onClick={() => scrollToSection('#contact')}>
              Termin vereinbaren
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.href)
                }}
                className="text-foreground hover:text-primary transition-colors text-shadow"
              >
                {item.name}
              </a>
            ))}
            <Button className="w-full">Termin vereinbaren</Button>
          </div>
        </nav>
      )}
    </header>
  )
}

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100')
          entry.target.classList.remove('opacity-0', 'translate-y-10')
        }
      },
      { threshold: 0.1 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen pt-16 flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/landingpage.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
      <div
        ref={heroRef}
        className="relative z-20 text-center text-white transition-all duration-1000 ease-out opacity-0 translate-y-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Transform Your Life</h1>
        <p className="text-xl md:text-2xl mb-8">Personal Training & Nutrition Consulting</p>
        <ArrowDownIcon className="mx-auto animate-bounce" size={32} />
      </div>
    </div>
  )
}

const Pricing = ({ scrollToContact }: { scrollToContact: () => void }) => {
  const services = [
    {
      title: 'Personal Training',
      description: 'One-on-one training sessions tailored to your goals',
      price: '€60',
      period: 'per session',
      image: '/pesonal_train.jpg',
    },
    {
      title: 'Nutrition Consulting',
      description: 'Personalized meal plans and nutritional guidance',
      price: '€80',
      period: 'per month',
      image: '/food.jpg',
    },
    {
      title: 'Outdoor Training',
      description: 'Group training sessions in nature',
      price: '€40',
      period: 'per session',
      image: '/outdoor-training.jpg',
    },
  ]

  return (
    <section id="services" className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col">
              <Image
                src={service.image}
                alt={service.title}
                width={400}
                height={300}
                className="object-cover h-48 w-full rounded-t-lg"
              />
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-4xl font-bold">{service.price}</p>
                <p className="text-muted-foreground">{service.period}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={scrollToContact}>
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const About = () => (
  <section id="about" className="py-16 bg-background">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">About Us</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="md:w-1/2 max-w-md">
          <p className="mb-4">
            At Personal Coach, we believe in empowering individuals to achieve their fitness and wellness goals. Our team of
            certified trainers and nutritionists are dedicated to providing personalized solutions that fit your unique needs
            and lifestyle.
          </p>
          <p className="mb-4">
            With over a decade of experience in the fitness industry, we've helped countless clients transform their lives
            through expert guidance, motivation, and support. Whether you're looking to lose weight, build muscle, or improve
            your overall health, we're here to guide you every step of the way.
          </p>
          <p>
            Our holistic approach combines cutting-edge training techniques with science-based nutrition advice, ensuring you
            get the most effective and sustainable results. Join us today and start your journey towards a healthier, stronger
            you!
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
            Necessitatibus consequatur nulla fugiat temporibus et perspiciatis dolores aut mollitia quos sint modi unde quo non, 
            obcaecati earum autem deserunt possimus aperiam.
          </p>
        </div>
        <div className="md:w-1/2 max-w-md">
          <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
            <Image
              src="/dhcoach.jpg"
              alt="Company Leader"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-xl font-semibold">Daniel Heidenreich</h3>
            <p className="text-muted-foreground">Personal Trainer</p>
          </div>
        </div>
      </div>
    </div>
  </section>
)


const Contact = forwardRef<HTMLDivElement>((props, ref) => {
  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    email: '',
    phone: '',
    message: '',
    services: {
      personalTraining: false,
      nutritionConsulting: false,
      outdoorTraining: false,
    },
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (service: keyof typeof formData.services) => {
    setFormData((prev) => ({
      ...prev,
      services: { ...prev.services, [service]: !prev.services[service] },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the form data to your backend
    // For now, we'll simulate a successful submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  const SuccessMessage = () => (
    <Card className="max-w-md mx-auto bg-white text-gray-800 shadow-lg rounded-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Vielen Dank für deine Anfrage!</CardTitle>
        <CardDescription className="text-lg">Deine Nachricht wurde erfolgreich übermittelt.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center">
          Wir schätzen dein Interesse an unseren Dienstleistungen. Unser Team wird sich in Kürze bei dir melden.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="bg-primary text-white hover:bg-primary-dark">Zurück zur Startseite</Button>
      </CardFooter>
    </Card>
  )

  return (
    <section id="contact" ref={ref} className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
        {isSubmitted ? (
          <SuccessMessage />
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6 bg-white p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vorname">Vorname</Label>
                <Input
                  id="vorname"
                  name="vorname"
                  value={formData.vorname}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="nachname">Nachname</Label>
                <Input
                  id="nachname"
                  name="nachname"
                  value={formData.nachname}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label>Service Interest</Label>
              <div className="space-y-2 mt-2">
                {Object.entries(formData.services).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={value}
                      onCheckedChange={() => handleCheckboxChange(key as keyof typeof formData.services)}
                    />
                    <Label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        )}
      </div>
    </section>
  )
})

Contact.displayName = 'Contact'

const FAQ = () => {
  const faqs = [
    {
      question: "How often should I work out?",
      answer: "The frequency of your workouts depends on your fitness goals, current fitness level, and schedule. Generally, we recommend 3-5 sessions per week for optimal results. During your initial consultation, we'll create a personalized plan that fits your needs and lifestyle."
    },
    {
      question: "What should I eat before and after a workout?",
      answer: "Pre-workout, focus on easily digestible carbs and some protein about 1-2 hours before exercising. Post-workout, aim for a combination of protein and carbs within 30 minutes to an hour after your session. Our nutrition consultants can provide more detailed, personalized advice based on your specific goals and dietary needs."
    },
    {
      question: "How long before I see results?",
      answer: "Results vary depending on  factors like consistency, diet, sleep, and genetics. Generally, you may start feeling better and more energetic within a few weeks. Visible changes often appear within 4-8 weeks of consistent training and proper nutrition. Remember, sustainable results take time, and we're here to support you throughout your journey."
    }
  ]

  return (
    <section id="faq" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-base">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

const Footer = () => (
  <footer className="bg-primary text-primary-foreground py-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p>Email: info@personalcoach.com</p>
          <p>Phone: +49 123 456789</p>
          <p>Address: Musterstraße 123, 12345 Berlin</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Impressum</h3>
          <p>Personal Coach GmbH</p>
          <p>Geschäftsführer: Max Mustermann</p>
          <p>Handelsregister: HRB 123456</p>
          <p>USt-IdNr.: DE123456789</p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>&copy; {new Date().getFullYear()} Personal Coach. All rights reserved.</p>
      </div>
    </div>
  </footer>
)

const PersonalCoachWebsite = () => {
  const contactRef = useRef<HTMLDivElement>(null)

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Pricing scrollToContact={scrollToContact} />
      <About />
      <FAQ />
      <Contact ref={contactRef} />
      <Footer />
    </div>
  )
}

export default PersonalCoachWebsite