import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import ContributionCard from '../components/ContributionCard.jsx';
import '../css/projects.css';

const TABS = [
  { id: 'projects', label: 'Projects' },
  { id: 'open-source', label: 'Open source' }
];

const projects = [
  {
    title: 'Nodus+ Health',
    status: 'In development',
    description: `A multi-tenant hospital information system for Kenyan health facilities. One patient
      record follows a visit from the front desk through triage, the consultation room, the pharmacy
      and the cashier, so nothing is keyed in twice and the day's money reconciles itself. The Go
      backend handles facility onboarding, multi-factor authentication, roles and permissions,
      auditing and the clinical workflows; the React front end is what nurses, clinicians,
      pharmacists and billing officers work in all day.`,
    techStack: ['Go', 'PostgreSQL', 'Redis', 'React', 'TypeScript', 'Docker'],
    images: [
      {
        src: '/images/nodus/billing-dashboard.webp',
        alt: 'The Nodus+ Health billing dashboard',
        caption: 'Billing: open tills, outstanding balances and ageing by payer'
      },
      {
        src: '/images/nodus/patient-register.webp',
        alt: 'The Nodus+ Health patient register',
        caption: 'The patient register, searchable across every facility in an organisation'
      },
      {
        src: '/images/nodus/pharmacy-formulary.webp',
        alt: 'The Nodus+ Health pharmacy formulary',
        caption: 'A pharmacy formulary priced and stocked in step with dispensing'
      }
    ],
    note: 'The source is private. I am happy to walk through the architecture.'
  }
];

const contributions = [
  {
    state: 'Open',
    repo: 'mattermost/mattermost',
    number: '33825',
    title: 'Fixed a race condition on concurrent thread replies',
    url: 'https://github.com/mattermost/mattermost/pull/33825',
    description: `Two people replying to the same thread at the same moment could collide and error.
      Reproduced the race and serialised the write path so a busy thread stays reliable.`,
    meta: ['Go', '+210 −10']
  },
  {
    state: 'Merged',
    repo: 'openfn/adaptors',
    number: '1274',
    title: 'Brought the MySQL adaptor in line with PostgreSQL',
    url: 'https://github.com/OpenFn/adaptors/pull/1274',
    description: `Added the missing function to the MySQL adaptor with the same signature and
      behaviour as its PostgreSQL counterpart, so people moving between the two stop hitting
      surprises.`,
    meta: ['TypeScript']
  },
  {
    state: 'Merged',
    repo: 'open-ug/conveyor',
    number: '92',
    title: 'Integrated BadgerDB as the log storage backend',
    url: 'https://github.com/open-ug/conveyor/pull/92',
    description: `Gave the Conveyor API server somewhere durable to keep its structured logs, so
      history survives a restart and operators can go back and read what actually happened.`,
    meta: ['Go', '+426 −24', '9 files']
  }
];

function Project() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabRefs = useRef([]);

  const requested = searchParams.get('tab');
  const active = TABS.some((tab) => tab.id === requested) ? requested : 'projects';

  const selectTab = (id) => {
    setSearchParams(id === 'projects' ? {} : { tab: id }, { replace: true });
  };

  const handleKeyDown = (event) => {
    const current = TABS.findIndex((tab) => tab.id === active);
    let next = current;

    if (event.key === 'ArrowRight') next = (current + 1) % TABS.length;
    else if (event.key === 'ArrowLeft') next = (current - 1 + TABS.length) % TABS.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = TABS.length - 1;
    else return;

    event.preventDefault();
    selectTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <Layout>
      <div className="work-page">
        <div className="page-head">
          <h1 className="page-heading">Portfolio</h1>
          <p className="page-lede">
            Products I have shipped, and open source I have contributed to.
          </p>
        </div>

        <div className="tabs" role="tablist" aria-label="Portfolio" onKeyDown={handleKeyDown}>
          {TABS.map((tab, position) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              className="tab"
              aria-selected={active === tab.id}
              aria-controls={`panel-${tab.id}`}
              tabIndex={active === tab.id ? 0 : -1}
              ref={(element) => { tabRefs.current[position] = element; }}
              onClick={() => selectTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {active === 'projects' ? (
          <div
            className="projects"
            role="tabpanel"
            id="panel-projects"
            aria-labelledby="tab-projects"
            tabIndex={0}
          >
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        ) : (
          <div
            className="contributions"
            role="tabpanel"
            id="panel-open-source"
            aria-labelledby="tab-open-source"
            tabIndex={0}
          >
            {contributions.map((contribution) => (
              <ContributionCard key={contribution.url} {...contribution} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Project;
