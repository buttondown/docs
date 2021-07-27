import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Playground from "../components/Playground/Playground";

export default {
  title: "Playground",
  component: Playground,
} as ComponentMeta<typeof Playground>;

const Template: ComponentStory<typeof Playground> = (args) => (
  <Playground {...args} />
);

export const Basic = Playground.bind({});
Basic.args = {
  css: `p { 
    margin-top: 1em;
    text-align: center;
}
label {
    font-weight: bold;
}
input[type='email'] {
    display: block;
    background: #FFFFFF;
    width: 100%;
    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 1rem;
}
input[type='submit'] {
    display: block;
    background: #0069FF;
    width: 100%;
    border-radius: 1rem;
    padding: 0.5rem;
}
    `,
  html: `<form
  action="
    https://buttondown.email/api/emails/
  "
  method="post"
  target="popupwindow"
  class="embeddable-buttondown-form"
>
  <label for="email">Email</label>
  <input
    type="email"
    name="email"
    placeholder="you@gmail.com"
  />
  <input type="hidden" value="1" name="embed" />
  <input type="submit" value="Subscribe" />
  <p>
    <a href="https://buttondown.email" target="_blank">
        Powered by Buttondown.
    </a>
  </p>
</form>`,
};

export const WithMetadata = Playground.bind({});
WithMetadata.args = {
  css: `p { 
    margin-top: 1em;
    text-align: center;
}
label {
    font-weight: bold;
}
input[type='text'],
input[type='email'] {
    display: block;
    background: #FFFFFF;
    width: 100%;
    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 1rem;
}
input[type='submit'] {
    display: block;
    background: #0069FF;
    width: 100%;
    border-radius: 1rem;
    padding: 0.5rem;
}
    `,
  html: `<form
  action="
    https://buttondown.email/api/emails/
  "
  method="post"
  target="popupwindow"
  class="embeddable-buttondown-form"
>
  <label for="email">Email</label>
  <input
    type="email"
    name="email"
    placeholder="you@gmail.com"
  />
  <label for="email">First name</label>
  <input
  id="first-name"
  type="text"
  name="metadata__first-name"
  required
  placeholder="John"
/>
  <input type="hidden" value="1" name="embed" />
  <input type="submit" value="Subscribe" />
  <p>
    <a href="https://buttondown.email" target="_blank">
        Powered by Buttondown.
    </a>
  </p>
</form>`,
};

export const WithTags = Playground.bind({});
WithTags.args = {
  css: `p { 
    margin-top: 1em;
    text-align: center;
}
label {
    font-weight: bold;
}
input[type='text'],
input[type='email'] {
    display: block;
    background: #FFFFFF;
    width: 100%;
    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 1rem;
}
input[type='submit'] {
    display: block;
    background: #0069FF;
    width: 100%;
    border-radius: 1rem;
    padding: 0.5rem;
}
    `,
  html: `<form
  action="
    https://buttondown.email/api/emails/
  "
  method="post"
  target="popupwindow"
  class="embeddable-buttondown-form"
>
  <label for="email">Email</label>
  <input
    type="email"
    name="email"
    placeholder="you@gmail.com"
  />
  <label for="email">Pokemon</label>
  <br />
  <input type="radio" id="Squirtle" name="tag" value="Squirtle">
  <label for="Squirtle">Squirtle</label>
  <input type="radio" id="Bulbasaur" name="tag" value="Bulbasaur">
  <label for="Bulbasaur">Bulbasaur</label>
  <input type="radio" id="Charmander" name="tag" value="Charmander">
  <label for="Charmander">Charmander</label><br>
  <br />
  <input type="hidden" value="1" name="embed" />
  <input type="submit" value="Subscribe" />
  <p>
    <a href="https://buttondown.email" target="_blank">
        Powered by Buttondown.
    </a>
  </p>
</form>`,
};
