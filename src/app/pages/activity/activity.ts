export class ActivityData {
    static activityData = [
        { label: 'Paper Presentation', route: 'paper', icon: 'file' },
        { label: 'Project Presentation', route: 'project', icon: 'cog' },
        { label: 'Club & Leadership', route: 'club', icon: 'users' },
        { label: 'Entrepreneurship', route: 'entrepreneurship', icon: 'th-large' },
        { label: 'NPTEL', route: 'nptel', icon: 'chart-bar' },
        {
            label: 'GATE/CAT/Govt. Exams',
            route: 'gate-govt',
            icon: 'bookmark-fill    ',
        },
        { label: 'Value Added Course', route: 'vac', icon: 'folder-open' },
        { label: 'Project to Paper', route: 'project-paper', icon: 'book' },
        {
            label: 'Techno Managerial Events',
            route: 'techno-managerial',
            icon: 'slack',
        },
        { label: 'Placement & Internship', route: 'placement', icon: 'envelope' },
        { label: 'NCC-NSS', route: 'ncc-nss', icon: 'inbox' },
        { label: 'Sports', route: 'sports', icon: 'globe' },
        { label: 'Voluntary Works', route: 'voluntary', icon: 'hashtag' },
    ];

    static exportData() {
        return [...this.activityData];
    }
}