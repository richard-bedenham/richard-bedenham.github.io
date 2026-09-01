---
title: Hotel Technology Strategy: A Complete Practical Guide
url: https://rbedenham.github.io/guides/hotel-technology-strategy/
markdown_url: https://rbedenham.github.io/guides/hotel-technology-strategy/index.md
author: Richard Bedenham
author_role: Director, primalRMS | Product Owner, webhotelier | primalres
reviewed: 2026-08-18
words: 8203
reading_minutes: 36
license: CC BY 4.0 - free to quote and cite with attribution
---

# The Complete Guide to Hotel Technology Strategy

![Five hotel managers stand around a long table in a sunlit stone lobby, discussing coloured cards laid out as options while a sketch sits between them.](c11-00-hotel-technology-strategy-cover.jpg)

*Ask a hotel what it is buying and you get a category. Ask what problem it is solving and the room goes quiet.*

Ask a hotel what it is buying and you get a category.

A property management system, the PMS. Customer relationship management software, a CRM. Something with artificial intelligence in it.

Ask what problem it is solving and the room goes quiet.

That is the gap.

The requirements document, the list a hotel sends to suppliers, describes a product.

It almost never describes the work the product is meant to do. So the supplier answers the list. It wins the bid. It delivers exactly what was asked for. And the hotel ends up with something it cannot use on a full Saturday in August.

I have sat on both sides of this.

I have bought hotel technology as a hotelier. I have built it as a supplier.

The failures look remarkably similar from either chair. Very few of the ones I have seen were technical.

**Clarity still wins.**

The hotels that choose well are not necessarily the ones with the biggest budget.

They are the ones that can say plainly what problem they are solving, in one sentence, without naming a product. That is not the same as saying money does not matter. It does, and this article has a whole section about it. But a large budget spent on a problem nobody has described is just a bigger mistake.

**Technology strategy is not a list of systems.**

![Three hotel colleagues lean over a glass table around a floating diagram of an unhappy guest at a front desk, with a thick icon catalogue set aside.](c11-01-problem-before-product.jpg)

*The requirements list describes a product. It almost never describes the work the product is meant to do.*

It is the order you do things in. It is how honest you are about the numbers. And it is how well you talk to the people building for you.

One boundary before we start, because most writing on this subject quietly ignores it. What follows assumes you get to choose. A great many hotels do not. Sign up to a brand as a franchise and the brand usually names the systems. The property management system. The central reservation system, the CRS, which holds rates across a whole group. The loyalty scheme. Often the booking engine. Hand your hotel to an operator to run and the operator picks the systems. The owner pays for them. If that is you, none of these questions disappear. They change shape. You are asking to be let off a rule, budgeting for a system somebody else chose, or arguing about a brand technology fee. Everything below still applies: the order you do things in, turning your hotel into words a developer can use, contracts, and the money argument. The choosing may simply not be yours.

## The Short Version

- Technology strategy is not a list of systems. It is the order you do things in. It is how honest you are about the numbers. And it is how well you talk to your suppliers. Describe the problem in one sentence before naming a product.
- Cost decides what a hotel can start. Attention decides what it can finish. The same twelve people sit in the middle of every project you begin. Order the work by what depends on what.
- A hotel has several systems of record, not one. Rates may live in the central reservation system. Mapping lives in the channel systems. Guest identity often lives nowhere at all. Ask which system is the record for each kind of data.
- Most hotels should buy rather than build. The real cost is not the building. It is the decade of owning the software. When you do buy, buy the supplier's direction and understanding rather than today's feature list.
- More projects fail on translation than on technology. Describe a day, not a feature. Go-live is a date and adoption is a curve, so budget for the curve.
- Four commercial clauses decide your freedom: notice and renewal, data exit, change of ownership, and price rises. Data protection duties sit beside them and are not bargaining points. Where the GDPR applies, Article 28 of Regulation (EU) 2016/679 sets out what the contract has to cover. Check what applies where you operate.
- Price the whole cost before you commit, not just the licence. Cost avoided and time given back are easier to defend than extra revenue. Say in advance what failure would look like.

## Technology Selection and Roadmap

A roadmap is a plan: what you will do, in what order, and why.

A wish list with dates on it is not a roadmap.

In my experience, most hotels have the second one.

The order matters more than the individual choices, because you cannot do everything at once. Two things limit you. They bite at different moments.

### Cost Starts Projects; Attention Finishes Them

Money decides what you can start. The biggest recent survey of European hotels and other places to stay says so plainly. The 2025 European Accommodation Barometer asked around 1,160 senior managers across twelve markets what stops them adopting technology. The cost of putting it in came first, named by 61 percent. The difficulty of making systems talk to each other followed at 58 percent. Not enough technical skill in the building came third at 53 percent. If you have ever watched a spending request die in an owners' meeting, none of that is a surprise.

Attention decides what you can finish. This is the limit hotels consistently underestimate, and it is the one I would put money on. Reception, housekeeping, reservations, finance and the general manager sit in the middle of every project you start. It is the same twelve people every time. Run two disruptive changes through them in one season and you will usually get two half-adopted systems and a tired team.

So hold both ideas at once.

**Cost is the barrier to starting. Attention is the limit on finishing.**

![A winding roadmap drawn on an office wall carries the same reception, housekeeping and management staff along every stage, with coins scattered beside it and colleagues hurrying past.](c11-02-roadmap-capacity.jpg)

*Cost is the barrier to starting. Attention is the limit on finishing. An approved budget does not make the work possible.*

An approved budget does not make the work possible. That is the half most spending proposals never mention.

**Order the work by what depends on what, not by what excites people.**

1. Sort out the data your other systems read, before you buy anything else that reads it. Every tool that reads your booking, rate and guest data inherits how bad it is. Buying reporting software on top of a broken source buys you faster wrong answers.
2. Deal with what is bleeding. Staff retyping the same numbers by hand. A nightly check of the books that never balances. A booking site that keeps losing your availability. Pain you can describe beats an opportunity you have to imagine.
3. Then the systems that touch money moving in or out, because errors there are expensive and visible.
4. Leave the nice-to-have things last. They are the most enjoyable to buy and the easiest to delay. Be honest about what counts as nice to have, though. Security is not. Neither is anything with a legal deadline on it.
5. Do not schedule a go-live, the day you switch over to the new system, into your busiest period. And do not run two of them through the same team in the same season.

Step one is the step people misread, so let me be precise about it. There are two traps in it, and I have watched hotels fall into both.

### A Hotel Has Several Systems of Record

The first trap is talking about *the system of record* as if a hotel had one. The system of record is the one system whose version of something counts as the truth. A hotel does not have one. It has one for each kind of data, and they are not all where you would guess.

- The stay, the folio - the running bill attached to a room - and the accounting records. Here the property management system really is the record, in almost every setup.
- Rates and how many rooms are for sale. In a group, a brand or a franchise this is often the central reservation system, not the property management system. Oracle's own documentation for OPERA Cloud says the central reservation system is the record for all rate plans. Rates built or changed there are then pushed down into OPERA Cloud. The company selling you the property management system is telling you the record lives somewhere else.
- The pricing decision. A revenue management system works out what to charge. It reads your data and writes prices back into the property management system or the central reservation system. It does not sit purely above the other systems or purely below them.
- Mapping and allocation. Mapping is the link that tells a booking site which of your rooms and rates it is selling. Allocation is how many rooms each site may sell. Both live in the channel systems and nowhere else.
- Who the guest is. Often no system holds the real record. There is a whole product category for stitching guest records together. It exists for a reason. The guest profile in the property management system is not the same record as the one in the booking engine, or the one in the guest database.

So the useful question is not *what is our system of record?*

It is:

**Which system is the record for this kind of data, and which way does it flow?**

![Four hotel staff work at separate screens showing charts, rate curves, a network map and a guest profile, with coloured ribbons arching from each towards a single figure.](c11-03-system-of-record-by-data-type.jpg)

*The useful question is not what our system of record is. It is which system is the record for this kind of data.*

Get that wrong and you fix the wrong thing. Say your rates are wrong because the link from the central system down to the property system is broken. Replacing the property system will not fix that. Say your guest data is a mess because nothing matches one guest across three systems. Replacing the property system will not fix that either.

### Cleaning Data and Replacing a System Are Different Projects

The second trap is the word *fix*.

It hides two completely different projects. Cleaning your data and keeping it clean is a habit. It is mostly your own people, and you should be doing it whether or not you replace anything. Replacing a core system is a large capital project, and it will eat more of that scarce attention than anything else you do. Do not let the first argument smuggle in the second. If somebody proposes replacing your property management system to fix a data quality problem, ask which of the two they are really selling.

### There Is a Reasonable Counterargument

There is a respectable argument against my order, and I should say so. It runs like this. Build the plumbing between systems first, and the single guest record that sits across them. That work outlives the core system you are about to replace. It pays off early. And it lets you put off the biggest project until it is genuinely the thing holding you back. You will meet this argument in the trade press. It is worth understanding.

I do not agree with it as a default, and I will not pretend the evidence settles it. Every source I could find making that case was written by a company that sells exactly that. An integration platform. A guest management layer. A customer data platform. That does not make them wrong. Their commercial interest is not an argument. But nobody has published independent evidence on the best order, either way. So treat both positions as reasoning rather than fact. Mine is that bad data spreads, and paying to hide it costs more than repairing it. Yours may reasonably differ.

Two more notes on the list itself.

On go-live dates, the advice is custom rather than research. Nobody has measured go-live timing against how often projects fail. It is still what almost every experienced installer will tell you, and the logic is obvious: you want spare hands on the floor. Two honest exceptions. A strongly seasonal hotel that closes has one window, at the start of the season, and cannot avoid it. And going live into an empty hotel never tests the system until the first real rush, by which time the installation team has moved on. If that is you, rehearse busy days on purpose. Keep the supplier involved through the first busy week. Do not sign off in the quiet one.

On priorities, resist the fixed list of areas. The categories shift. The reasoning does not. Some things do stay near the top permanently, though. Security, keeping the hotel running when something breaks, and anything with a legal deadline are not fashion.

### Write the Problem Before the Requirement

Choosing has a hidden benefit.

A hotel that cannot describe how it works cannot brief a supplier on it. Half the value of running a selection is that it forces you to look at yourself. Write down how your hotel actually runs before you write your requirements. One warning: how you work now is a starting point, not automatically the target. Do not pay to automate a workaround you should be scrapping.

Consider the difference between two briefs.

"We need a new property management system."

"Our night audit - the end-of-day routine that closes the books - runs two hours long because reception retypes every restaurant charge by hand, and nobody can see a group's balance without opening three screens."

The first invites a demonstration.

**The second invites a solution.**

And you can tell quickly whether the person opposite has understood it.

## Build, Buy and Partner

Three options, not two.

**Build. Buy. Or partner.** Take somebody else's platform and set it up your way. Connect it to your other systems. Add a little of your own code at the edges.

That is my own way of splitting it rather than a standard industry one, and it deliberately covers only software you control. An owner will name two more straight away. You can hand out the job itself rather than the software: somebody else prices your rooms, somebody else answers your reservations, somebody else runs your computers. Or you can be handed a fixed set of systems by a brand or an operator, which is not a decision at all. Both are fair answers to "how do we get this done", and neither is build, buy or partner.

### Build Only When You Are Willing to Own It for Years

*The rules named in this section differ by country, and they are reissued. Some of them are law and some of them are card industry standards. What follows is how I read the general position, not legal advice for your hotel. Check where you actually stand before acting on any of it.*

Most hotels should buy.

That is a recommendation, not a measured fact. The reason is not skill. It is that the cost of software is not the building, it is the decade of owning it. Laws change. Card companies change their rules. A computer update breaks a printer. The developer who wrote it leaves. You are a hotel business that has quietly taken on a permanent engineering job, and it will be looked after by whoever is least busy.

The rules really do keep moving, and the last two years make the point better than any argument. The card industry has its own security rulebook, the Payment Card Industry Data Security Standard, or PCI DSS. Version 4 held a set of requirements with a later start date, and those became compulsory on 31 March 2025. The EU Data Act, Regulation (EU) 2023/2854, started to apply on 12 September 2025. It brings rules about contracts and about moving to another supplier. Somebody has to read all of that and work out whether your software still obeys it. If you built it, that somebody is you, every year, forever.

The exceptions are narrow and worth naming. They are not the only ones that could ever apply. They are the ones I would accept without argument.

- The thing genuinely sets you apart, and guests can feel it. Not your accounting.
- No supplier serves the way you operate at all, because it is unusual rather than because you have not looked properly.
- It is thin glue between two systems you already own: small, written down, replaceable in a week.
- You already employ permanent product and engineering people, not a contractor you used once.

One test settles most arguments.

It is seven years from now. The person who wrote this is long gone. Three other things are on fire.

**Would you still be content to maintain it?**

![Three scenes in one pale hotel hall: a man in an apron stacking glowing blocks, a woman choosing a product from a display case, and two people shaking hands.](c11-04-build-buy-partner.jpg)

*Seven years from now, the person who wrote it has gone. Would you still be content to maintain it?*

### Partnering Depends on the API

The partner option deserves one warning, because "a bit of your own code at the edges" is not equally easy everywhere. Systems talk to each other through an API, an application programming interface. It is a set of doors a supplier opens for other software to come in and out of. Some platforms open those doors wide. Oracle includes its integration platform with the OPERA Cloud property management foundation. You sign yourself up, you pay for what you use, and it starts at around ten dollars for the first ten thousand calls a month. Cloudbeds publishes a route a single hotel can set up for itself. Other platforms make you pass a formal approval process first, and Mews and Apaleo both run one, with Mews approving each part of its interface separately. So before you plan on writing code at the edges, find out four things. Can you write data in, or only read it out? How many calls are you allowed? Is approval required, and how long does it take? And what does it cost? That spread is real, and no article can tell you where your platform sits.

### Buy the Supplier's Direction, Not Only Today's Checklist

**When you buy, buy the direction, not just the features.** A feature comparison is a snapshot of a product on the day of the demonstration.

What you are really buying is where the supplier is going and how well it understands hotels.

Understand what a roadmap is, though. It is evidence about judgement. It is not a promise to deliver. Suppliers say so themselves, in writing. Oracle's standard wording tells customers not to buy on the strength of future plans, because what is in them and when can both change. Mews has published that it keeps no fixed long-term roadmap and commits only a short way ahead. Both are being honest. Read a roadmap for what it tells you about how a company thinks. Do not read it as a date.

Consider two demonstrations. One product ticks almost every line of your checklist. The person presenting it cannot explain how half board is priced for a child sharing with two adults. The other product misses several lines. Its product owner describes your night audit back to you more accurately than you wrote it.

I would buy the second, and here is the imbalance that makes that defensible. A missing feature is a known problem you can close. A supplier who does not understand your hotel is a permanent problem. It will produce a new surprise every month for the length of the contract. I am not going to tell you the missing features arrive in two updates, because that is unknowable. How often suppliers release changes is not even a comparable unit across this market. Some ship continuously. Some ship named seasonal releases. The big corporate platforms move slower again.

So sort the gaps into two piles. If a missing item is optional, accept the risk with your eyes open and move on. If it is compulsory, it must be there and tested now, or written into the contract with a date and a penalty. Tax invoicing, taking payments, accessibility, group billing, feeding your accounts system and the reporting your country demands usually are compulsory. Which of those actually bind your hotel is set nationally, and the list is not the same everywhere. Check your own position before you accept a gap in a product. A slide is not a commitment.

### Test the Supplier, Not Only the Product

And test that understanding properly, because the sharpest objection to this whole argument is that understanding can be faked. The person who described your night audit back to you may be a salesperson chosen for exactly that skill, and you may never see them again. So meet the person who owns the product and the person who will run your installation, not only the sales team. Ask for a reference customer who runs a hotel like yours, not just one your size. And make them demonstrate with your data.

## Implementation and Change

In my experience, more hotel technology projects fail on translation than on technology.

I cannot give you a number for that, and I would be suspicious of anybody who could. Nobody has published a study of why hotel technology projects fail. The general software figure everybody quotes has been taken apart by other researchers, so borrowing it would make the claim look stronger while making it weaker. Treat this as what it is. A pattern I have watched from both sides of the table.

### Translation Is Where Implementation Breaks

The pattern is consistent. The hotel describes how it works. The supplier hears a feature request. Nobody notices the gap until go-live, when it is expensive.

Consider one sentence: "We need to be able to split a bill."

The hotel means a tour group of forty. The operator pays for the rooms and breakfast on one invoice, taxed its own way. Each guest pays for their own extras at departure. And in two rooms the people sharing want their extras split between them. The supplier hears something much smaller. Not because the software is crude: sending a charge to a different bill, and running several bills for one room, have been standard for years. The gap is how big the job is, not what the software can do. Both readings of the sentence are honest. Only one survives a Sunday morning checkout.

### Describe a Day, Not a Feature

The fix is unglamorous.

And it works.

- Put a named owner on each side who is allowed to make decisions, and keep them there.
- Describe a day, not a feature. Walk the supplier through arrival to night audit in the order it happens.
- Agree what your words mean, early, and write it down. "Rate", "booking", "release" and "group" all mean different things in a hotel and in a piece of software. "Release" alone has three meanings. In distribution it is handing unsold rooms back from a block. In software it is a new version. At the front desk it is a room freed up. And do not assume the names of your routines survive either. OPERA Cloud still has an end-of-day and night audit routine you can set up. Mews closes the business day by itself and states that no manual night audit is required. If your word list assumes a night audit, you may be describing a task the new system does not have.
- Test with your own data, including the ugly cases: the room out of service, the split payment, the guest who extends twice. Use data shaped like the real thing, not real card numbers. Copying live payment and personal data into a test system is its own kind of incident. Data protection law and the card industry security rules both bear on what you may copy, and where it may sit. Check your own position before anybody exports a live database into a test environment.
- Put a date on the end of the in-between period, and be precise about what that period is.

### Parallel Running Is Often the Wrong Phrase

That last point needs unpacking. People say "parallel running", meaning the old and new systems running side by side, and they use it loosely. It matters. You cannot genuinely run two live property management systems side by side. You cannot check the same guest in twice, put the same charge on two bills, or run two night audits over the same rooms. What actually happens is a switch-over, with the old system kept for reading only. That covers history, reporting and the records you are obliged to keep. Which records those are, and for how long, is set nationally. Check what your own country requires rather than assuming a retention period travels across a border. True parallel running belongs to finance, payroll and reporting, where you can enter something twice and compare. So put two dates in the plan. The day you switch. And the day the old system is finally turned off. Without the second date, "temporary" becomes a bill you are still paying in three years.

### Go-Live and Adoption Are Different

And be honest about what *live* means.

**The system is not live when it is installed. It is live when the team uses it instead of the workaround they invented.**

That workaround is your best diagnostic. Somebody keeps a spreadsheet. It may be because the system cannot do something. It may be because nobody showed them that it can. It may be because a rule of yours makes the proper route slower than the improper one. All three are worth knowing. Find the person who built it and put them in the project. They understand the hotel better than the document does.

**Go-live is a date. Adoption is a curve. Budget for the curve.**

![A rising path across a hotel lobby runs from confetti at a quiet reception desk, through staff being coached, to a busy desk serving a queue of arriving guests.](c11-05-golive-vs-adoption.jpg)

*Go-live is a date. Adoption is the day the team uses the system instead of the workaround they invented.*

## Vendor Management and Contracts

The contract is not the end of choosing.

It is the beginning of the relationship.

Most contracts are read properly at exactly one moment: in a hurry, when something has already gone wrong.

### Four Commercial Clauses Decide Your Freedom

Four clauses about the commercial terms decide how much freedom you keep. Commercial is the key word, and I will come to what the list does not cover.

- Notice period, and how the contract renews. Some deals roll on, with a ninety day window to give notice. That window opens and closes once a year. It is a very different commitment from a one-year term. Put the window in the diary the day you sign. Nobody will remind you.
- Your right to take your data with you when you leave. What you get, in what form, how fast, at what price, and whether it includes the history rather than only today's picture.
- What happens if the supplier is bought. Say what becomes of your data, your prices and the product plan. Small hotel software companies are bought regularly. Take the last two years alone. Mews bought Frontdesk Anywhere. Agilysys bought Book4Time and ResortSuite. Shiji took majority ownership of Hisense Intelligent Commercial Systems. If you think your supplier is too small to be interesting, that is exactly the kind that gets bought.
- Price rises. Whether increases are capped, tied to inflation, or entirely up to the supplier at each renewal.

### Commercial Freedom Is Not the Whole Contract

*Part of what follows is data protection law and part of it is card industry rules. Both differ by country and both move. This is how I read the general position, not legal advice for your hotel. Check your own contracts and your own position before acting on it.*

**Those four decide your freedom.** They do not make the contract complete, and this is where a checklist like mine can quietly hurt you. If the system holds guest data, and it almost certainly does, the data protection terms are not optional bargaining points. Europe's data protection law is the General Data Protection Regulation, the GDPR. Its full name is Regulation (EU) 2016/679. The UK has its own version of it, and the detail there is a separate question. Article 28 of that Regulation governs your contract with a processor. A processor is any company that handles personal data on your behalf. Article 28 says the contract must cover a set list. Written instructions from you. Confidentiality. Security measures. Your permission before it passes the data to anyone else, and the same terms passed on to them. Help when a guest asks to see or delete their data. Telling you about breaches. Deleting or returning the personal data when the service ends. And your right to audit. Notice that the delete-or-return duty is itself an exit clause, sitting inside the subject of this section. A hotel that negotiates my four clauses hard and leaves those out has a strong commercial contract. Where the GDPR applies, that same contract is usually missing something Article 28 requires. Whether your own contract falls short is a question for a lawyer in your own country. The point holds either way. Commercial strength is not the same thing as a complete contract.

Payments carry a similar trap. If a supplier touches card data, handing the job over does not usually hand over your duty. The card industry's security standard is PCI DSS, the Payment Card Industry Data Security Standard. As a general rule it expects the supplier to state in writing what it is responsible for. It also expects you to keep checking that the supplier still follows the rules. The wording and the numbering move between versions of the standard, so work from the version your acquirer actually holds you to. Worth saying plainly: these rules are not law. They are set by the card networks and by the bank that processes your card payments. That changes who enforces them, not whether you have to comply.

Consider the difference between two exit clauses.

"Customer data will be made available on termination."

"Within ten working days of the contract ending, the supplier provides booking, guest profile, bill and rate history in a documented form a computer can read, with a published list of every field, at no extra charge."

The first is a sentence.

**The second is a way out.**

![Two people sit opposite each other at a small table with contract papers, a calendar icon and a handshake icon between them, one passing across a labelled box.](c11-06-contract-exit-path.jpg)

*A clause promising that your data will be made available is a sentence. A format, a field list, a deadline and a price is a way out.*

### EU Exit Rights Have Changed

Now the part that has moved. If you sign contracts in the EU, some of that second clause is becoming law rather than a win you have to fight for. The EU Data Act, Regulation 2023/2854, has applied since 12 September 2025 and covers data processing services, which includes most software you rent rather than own. Its rules on moving supplier do five things. They cap the notice you must give at two months. They require a handover period. They require a minimum window to pull your data out before it is erased. They require the contract to list the kinds of data you can export. And they require export in structured, commonly used formats a computer can read. On money, suppliers may currently charge only what switching costs them, and from 12 January 2027 they may not charge for it at all.

Two warnings before you rely on that. Whether a particular property management or reservation system contract falls inside that definition is a legal question. The published opinions do not agree on every detail. Take advice on your own contracts rather than mine. And outside the EU none of this applies, so it is still a negotiation. Either way the clause is worth writing. In Europe you are now writing down a floor rather than winning a concession.

Ask for the right contents, too. Bookings, guest profiles, bills and rate history are the obvious list and they are not enough. Add the financial and accounting records, the tax records, and any guest registration paperwork your country obliges you to keep. Those duties come from national law. They outlive the contract. Then apply the same discipline in the other direction. Do not demand every scrap of guest personal data and hand it to a new supplier. Work out first what you may keep, and for how long. Skip that step and the handover is itself a breach. Ask for what you need to run the hotel and obey the law, not for everything that exists. This is one of the few places in this article where I would tell you to get a lawyer in your own country. Do not reason this one out.

### Service Levels Must Describe Hotel Impact

Write the service promises in hotel language. A service level agreement is the supplier's written promise about uptime and response times. "99.9 percent availability" tells your duty manager nothing on its own. Ask for both: the measurable uptime and response numbers, and how serious a fault is, graded by what the hotel cannot do. Cannot check a guest in. Cannot take a payment. Cannot close the night audit.

This is not a fantasy ask, and it is worth knowing that before you go into the meeting. Mews publishes a service level agreement that treats a failure of core functions as high priority. Its own examples are check-in, check-out or taking payments being unavailable. It commits to a monthly uptime figure alongside that. Others grade faults by impact too, in vaguer words. So the question is not whether the market can do this. It is whether your supplier will write it down for you. If they cannot grade a fault by what your hotel cannot do, that tells you how well they know your hotel.

### Ask the 3am Saturday Question

Then check support against your actual operation. A hotel runs at three in the morning, and the old complaint is that support desks do not. Be careful with that one, because it is easy to rebut. Plenty of major suppliers do work overnight. Oracle's published cloud policies promise to handle support requests 24 hours a day. The target to respond to the most serious faults is fifteen minutes. Work continues round the clock until the fault is fixed or worked around. Amadeus Hospitality publishes support every hour of every day of the year.

The real question is narrower and much more useful:

**What is covered at three in the morning, for which faults, through which channel, and at what price?** That is where it gets thin. Mews puts round-the-clock live chat and phone in a paid-for support tier. Cloudbeds puts phone support in a premium package. Stayntouch limits phone contact to top-priority faults. None of that is unreasonable, and all of it is invisible until the night you need it. So ask the question the way it will happen. It is 3am on a Saturday, the hotel is full, nobody can check in. Who answers? On what number? And is it included in what we are signing?

### Vendor Management Starts After Signature

Then manage the relationship. Hold a review every three months that is not a sales call, with a short agenda: open problems, performance against the promises, and what is coming. Write problems down, even the ones sorted out on the phone, because a pattern is only visible if somebody recorded it. That record is also the only thing that lets you claim money back later, or walk away for breach of contract.

Be a good customer as well. Answer questions quickly, speak with one voice, keep a test system, and do not send four contradictory requests from four departments. My experience on the supplier side is that the best people drift towards the customers where good work is possible. Nobody publishes a staffing policy that says so, but watch where the strong installers end up.

## Cost and ROI

Return on investment, ROI, is what you get back divided by what you spent.

Most hotels get the bottom half wrong before they start arguing about the top half. So start with cost. **The licence fee is the visible number. It is almost never the whole number.**

### Price the Whole Cost, Not the Licence

Price the whole thing before you commit:

- Connecting systems together, including work on the systems you are not replacing.
- Moving the data across, cleaning it, and the checking that proves it arrived intact.
- Training, retraining, and training the people who join afterwards.
- Your own people's time, for a year. Nobody sends you a bill for it, which is why it gets left out. In the projects I have priced it has repeatedly been the largest cost of all.
- The changeover period, when you are paying for two systems. Usually paying for both and running one, with the old one kept for reading only.
- Computers, network and anything else in the building that has to be replaced to support it.

Connecting systems is where cost hides. A quoted licence is exact. A quoted integration is an estimate, and the estimate is the one that moves. Platforms that charge by usage have made part of this quotable, which helps, but that prices the pipe rather than the project. The mapping, the testing and the odd cases are still an estimate.

### Revenue Uplift Is Harder to Prove Than It Looks

Then there is the business case, the argument you put to whoever holds the money, which in hotel technology is usually argued badly. It is argued on extra revenue, and proving where revenue came from is contested. Claim a rise in direct bookings and an owner will ask a fair question. How much of it came from the market recovering, the refurbishment, the new photographs or the competitor closing?

The tempting conclusion is that you cannot separate it out at all. That is too strong, and a marketing analyst will correct you. The methods exist and are mainstream in online retail. Switch the spending off in one region and compare. Run controlled experiments. Model how each kind of spending moves sales. Rebuild statistically what would have happened anyway. They work. They also need traffic volume, budget you can afford to hold back, and expertise. And even the people who do this professionally are not fully confident in the answers. A 2026 survey of marketers found 44 percent questioning how reliable their own results were on what their spending actually added.

So the honest version is this:

At one hotel, you will rarely separate out a revenue effect credibly enough to survive the meeting that matters. If you can run a real switch-it-off test, do it and use the result. If you cannot, do not build the case on the number.

### Savings Need to Become Real Actions

**Cost avoided and time given back are usually the more defensible arguments.**

You can measure where you started before you begin.

Consider the difference between two claims.

"This will increase direct revenue."

"This removes fourteen hours a week of retyping at reception, which is close to two shifts, and it clears the audit finding on card data handling that keeps coming back."

The second is arguable in front of an owner.

The first is a hope with a number on it.

But go one step further than that second claim, because a financial controller will stop you exactly there. Hours saved are not money saved until they reach the wage bill. Finance discounts them, and it is right to. Fourteen hours a week becomes real when it is tied to an action. A job you do not fill when somebody leaves. Overtime removed. Agency hours cut. Or the time moved to work that earns money. Name which one. Otherwise you have described an improvement rather than a saving, and the owner will hear the difference even if you do not.

While you are in that room, speak the owner's language. Hotel technology cost is not charged to any one department, so it lands directly on gross operating profit rather than inside a department's margin. Where each cost sits does move from time to time. The twelfth revised edition of the uniform system of accounts became the standard to adopt on 1 January 2026. Ask your financial controller where your particular costs will sit before you present, not afterwards.

### Define Success and Failure Before the Project Starts

Two habits make any case honest. Measure where you are before you start. There are statistical ways to rebuild a comparison afterwards. They are harder, weaker and easier to argue with than a number you wrote down in advance. Writing it down costs you an afternoon. And state in advance what failure looks like: the date, the measure, and the number below which you would call this a mistake. **A business case nobody can lose is not a business case.**

![A stepped stack of coloured blocks rises beside a manager reviewing figures on a tablet, while a colleague studies a wall chart of a rising curve, clock and money icons.](c11-07-technology-business-case.jpg)

*The licence fee is the visible number. It is almost never the whole number.*

Cost the option of doing nothing too, on the same terms.

Sometimes it wins.

## Common Questions

### What is a hotel technology strategy?

A hotel technology strategy is not a list of systems. It is the order you do things in. It is how honest you are about the numbers. And it is how well you brief the people building for you. The hotels that choose well can name the problem in one sentence, without naming a product. In a branded or managed hotel the choosing may not be yours. The questions still apply.

### What should a hotel do first when planning new technology?

Sort out the data your other systems read, before buying anything else that reads it. Every tool inherits how bad your booking, rate and guest data is. Then deal with what is bleeding. Then the systems that touch money. Leave the nice-to-have things last.

### What is the system of record in a hotel?

A hotel has several. The property management system holds the stay, the folio and the accounting records. Rates and availability often sit in the central reservation system instead, and mapping and allocation live in the channel systems. Ask which system is the record for each kind of data, and which way it flows.

### Should a hotel build its own software or buy it?

Most hotels should buy. The cost of software is not the building. It is the decade of owning it. Laws change, card rules change, and the developer who wrote it leaves. Build only in narrow cases. The thing genuinely sets you apart. No supplier serves the way you operate. Or it is thin glue you could replace in a week.

### What does it mean to partner rather than build or buy?

Partnering means taking somebody else's platform and setting it up your way. You connect it to your other systems and add a little of your own code at the edges. How easy that is depends on the API. Ask what you can write, how many calls you get, whether approval is needed, and what it costs.

### Why do hotel technology projects fail?

More projects fail on translation than on technology, in my experience. The hotel describes how it works and the supplier hears a feature request. Nobody notices the gap until go-live, when it is expensive. Nobody has published a study of this, so treat it as a pattern rather than a finding.

### What is the difference between go-live and adoption?

Go-live is a date. Adoption is a curve. The system is not live when it is installed. It is live when the team uses it instead of the workaround they invented.

### Can you run two hotel property management systems in parallel?

No, not genuinely. You cannot check the same guest in twice, put one charge on two bills, or run two night audits over the same rooms. What happens instead is a switch-over, with the old system kept for reading only. Put two dates in the plan: the day you switch, and the day the old system is turned off.

### What should a hotel look for in a technology contract?

Four commercial clauses decide your freedom. Notice and renewal. Your right to take your data with you. What happens if the supplier is bought. Price rises. Data protection terms sit beside them and are not optional. Article 28 of the GDPR, Regulation (EU) 2016/679, lists what a contract with a processor must cover. In the EU, the Data Act, Regulation (EU) 2023/2854, now sets a floor for moving supplier. Both are European rules, so check what reaches you where you operate.

### How do you build a business case for hotel technology?

Price the whole cost first: integration, data migration, training, your own people's time, the changeover period and any hardware. Then argue on cost avoided and time given back rather than extra revenue. Hours saved are not money saved until they reach the wage bill, so name the action. State in advance what failure looks like.

## Key Terms

- **Roadmap.** A plan of what you will do, in what order, and why. A wish list with dates on it is not a roadmap.
- **System of record.** The one system whose version of something counts as the truth. A hotel has one for each kind of data, not one overall.
- **Central reservation system, or CRS.** The system holding rates across a whole group. In a brand or franchise it is often the record for rate plans, not the property management system.
- **Mapping and allocation.** Mapping is the link telling a booking site which of your rooms and rates it is selling. Allocation is how many rooms each site may sell.
- **API, or application programming interface.** The set of doors a supplier opens for other software to come in and out of. Some open wide, some require formal approval first.
- **Partner model.** Taking somebody else's platform, setting it up your way, connecting it to your other systems and adding a little of your own code at the edges.
- **Go-live.** The day you switch over to the new system. Go-live is a date, not proof that anybody is using the system.
- **Adoption.** The point at which the team uses the new system instead of the workaround they invented. Adoption is a curve, so budget for it.
- **Parallel running.** Running an old and a new system side by side. Parallel running belongs to finance and reporting, not to two live property management systems.
- **Service level agreement, or SLA.** The supplier's written promise about uptime and response times. Ask for fault severity graded by what your hotel cannot do.
- **Processor.** Any company that handles personal data on your behalf. Article 28 of the GDPR, Regulation (EU) 2016/679, sets out what your contract with one must cover.
- **Return on investment, or ROI.** What you get back divided by what you spent. Most hotels get the bottom half wrong before they argue about the top half.

## How This Connects to the Wider Hotel Technology Stack

Technology strategy decides what the other domains get to do, or, in a branded or managed hotel, what case you need to make to whoever holds that decision.

- **[Hotel Operations and PMS](../hotel-operations-and-pms/)** explains how the operational system works. This domain decides whether to replace it, when to do so and what evidence justifies the change.
- **[Distribution and Connectivity](../distribution-and-connectivity/)** owns channel management and the movement of rates and availability. Weighing a distribution change against every other demand on the same team belongs here.
- **[Direct Booking and E-commerce](../direct-booking-and-e-commerce/)** owns the booking engine and conversion journey. Deciding how much to build, buy or ignore belongs here.
- **[Revenue Management](../revenue-management/)** covers how the hotel prices. Whether to buy an RMS, and how to judge one, is a technology-strategy decision.
- **[Market Intelligence and Analytics](../market-intelligence-and-analytics/)** defines what the data means. This domain decides what the hotel should pay to obtain it and whether the reporting layer is worth the cost.
- **[Guest Technology and CRM](../guest-technology-and-crm/)** covers what the hotel does with guest data. Contractual exit rights, processor obligations and the ability to retrieve that data when changing supplier belong here.
- **[Payments and Financial Technology](../payments-and-financial-technology/)** covers how the hotel takes money and the rules around it. Provider selection, escalation and contractual liability sit on the border.
- **[Sales, Groups and MICE](../sales-groups-and-mice/)** covers how negotiated business is handled. Any technology bought for it should follow the same sequencing, implementation and ROI discipline described here.
- **[Data, APIs and Integration](../data-apis-and-integration/)** is the technical partner to this domain. Integration capability, data ownership, portability and hidden implementation effort often determine whether the strategic choice is viable.
- **[AI, Automation and Agents](../ai-automation-and-agents/)** covers what automation can do. Whether a process should be automated at all, and what that automation is worth, belongs here.
- **[Emerging Hotel Technology](../emerging-hotel-technology/)** holds what is not yet stable enough to plan around. Once something becomes buyable and operationally credible, the buying decision returns here.

## Related Reading

- **6 Technology Areas Every Hotel Should Prioritise**
- **Choosing Hotel Technology in the AI Era: Clarity Still Wins**
- **Why Hotel and Technology Communication Makes or Breaks Projects**

As the wider article library grows, the most relevant supporting pieces can be added here in batches.

Almost every failed hotel technology project I have seen could be read in advance. The problem was never stated in one sentence. The order was wrong. Or nobody turned the way the hotel works into something a developer could build. Some projects do fail for reasons no amount of clarity would have prevented. A supplier goes under. A rule changes halfway through. The budget was never enough for the job. Those exist. They are not the ones I keep meeting.

Fixing the common ones does not require a bigger budget. It requires three things. Describe your own hotel accurately. Buy the supplier rather than the feature list. And argue a case you can still defend when somebody asks what would have happened anyway.

**Clarity still wins. It always did.**

I would rather be corrected than agreed with. If something here does not match what you see in your own hotel, tell me, and tell me what you saw.
