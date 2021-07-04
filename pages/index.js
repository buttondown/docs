import { Disclosure } from '@headlessui/react'
import {
  BeakerIcon,
  EmojiHappyIcon,
  InboxInIcon,
  PresentationChartBarIcon,
  QuestionMarkCircleIcon,
  TerminalIcon,
  XIcon,
} from '@heroicons/react/outline'


const navigation = [
  {
    name: 'Welcome to Buttondown!', href: '#', icon: EmojiHappyIcon, current: true,
  },
  {
    name: 'Getting started', href: '#', icon: PresentationChartBarIcon, current: false,
    children: [
      { name: 'Importing your data', href: '#' },
      { name: 'Hosting from a custom domain', href: '#' },
      { name: 'Sending from a custom domain', href: '#' },
      { name: 'Customizing your emails', href: '#' },
      { name: 'Styling your web presence', href: '#' },
    ],
  },
  {
    name: 'Migration guides', href: '#', icon: InboxInIcon, current: false,
    children: [
      { name: 'Substack', href: '#' },
      { name: 'Mailchimp', href: '#' },
      { name: 'Tinyletter', href: '#' },
      { name: 'ConvertKit', href: '#' },
    ],
  },
  {
    name: 'API reference', href: '#', icon: TerminalIcon, current: false, children: [
      { name: 'Introduction', href: '#' },
      { name: 'Authentication', href: '#' },
      { name: 'Events and webhooks', href: '#' },
      { name: 'Changelog', href: '#' },
      { name: 'Subscribers', href: '#' },
      { name: 'Emails', href: '#' },
      { name: 'Drafts', href: '#' },
      { name: 'Tags', href: '#' },
      { name: 'Scheduled emails', href: '#' },
      { name: 'Images', href: '#' },
      { name: 'Newsletters', href: '#' },
    ]
  },
  {
    name: 'Integrations', href: '#', icon: BeakerIcon, current: false, children: [

      { name: 'Zapier', href: '#' },
      { name: 'Fathom', href: '#' },
      { name: 'Simple Analytics', href: '#' },
    ]
  },
  {
    name: 'Need more help?', href: '#', icon: QuestionMarkCircleIcon, current: false,
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1">
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1">
                {navigation.map((item) =>
                  !item.children ? (
                    <div key={item.name}>
                      <a
                        href="#"
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                            'mr-3 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    </div>
                  ) : (
                    <Disclosure as="div" key={item.name} className="space-y-1">
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            )}
                          >
                            <item.icon
                              className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-300"
                              aria-hidden="true"
                            />
                          
                            <span className="flex-1">{item.name}</span>
                            <svg
                              className={classNames(
                                open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                                'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
                              )}
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                            </svg>
                          </Disclosure.Button>
                          <Disclosure.Panel className="space-y-1">
                            {item.children.map((subItem) => (
                              <a
                                key={subItem.name}
                                href={subItem.href}
                                className="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-750"
                              >
                                {subItem.name}
                              </a>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
        </main>
      </div>
    </div>
  )
}