/**
 * CIN Framework Sidebar Component
 * @package CIN Framework
 * @author Mawi Man
 * @license Proprietary - All rights reserved to Ayoub Alarjani
 */

/**
 * Gets the current path prefix for navigation
 * @returns {string} The path prefix
 */
function getCurrentPathPrefix() {
    return window.location.pathname.includes("/p/") ? "/p/" : "";
}

/**
 * Generates the sidebar HTML structure
 * @returns {string} The complete sidebar HTML
 */
function generateSidebarHTML() {
    const pathPrefix = getCurrentPathPrefix();
    return `
        <aside class="cin-sidebar" id="sidebar">
            <nav class="cin-sidebar-nav">
                <!-- Search Section -->
                <div class="cin-sidebar-search">
                    <input type="text" class="cin-input cin-input-search" id="cin-sidebar-search" placeholder="Search..." data-translate-placeholder="البحث..." />
                    <div class="cin-search-no-results" id="cin-search-no-results" style="display: none;">
                        <p data-translate="لا توجد نتائج">لا توجد نتائج / No results found</p>
                    </div>
                </div>
                
                <div class="cin-sidebar-section" data-searchable="main" data-search-terms="main رئيسي">
                    <ul class="cin-nav-list">
                        <li><a href="${pathPrefix}main.html" class="cin-sidebar-item" data-translate="الرئيسية" data-search-terms="main رئيسي">MAIN</a></li>
                    </ul>
                </div>
                <div class="cin-sidebar-section" data-searchable="cin_framework" data-search-terms="cin framework إطار عمل getting started release notes">
                    <h4 class="cin-sidebar-title cin-collapsible" data-translate="إطار عمل CIN" onclick="toggleSidebarSection(this)">CIN FRAMEWORK <span class="cin-collapse-icon">▼</span></h4>
                    <ul class="cin-nav-list cin-collapsible-content cin-collapsed">
                        <li><a href="${pathPrefix}cin-framework.html" class="cin-sidebar-item" data-translate="إطار عمل CIN" data-search-terms="cin framework إطار عمل overview">CIN Framework</a></li>
                        <li><a href="${pathPrefix}getting-started.html" class="cin-sidebar-item" data-translate="البدء" data-search-terms="getting started البدء installation setup">Getting Started</a></li>
                        <li><a href="${pathPrefix}cin-framework_release_notes.html" class="cin-sidebar-item" data-translate="ملاحظات الإصدار" data-search-terms="release notes ملاحظات الإصدار framework changelog">Release Notes</a></li>
                    </ul>
                </div>
                <div class="cin-sidebar-section" data-searchable="cin_cli" data-search-terms="cin cli command line interface أداة سطر الأوامر commands available release notes">
                    <h4 class="cin-sidebar-title cin-collapsible" data-translate="أداة CIN CLI" onclick="toggleSidebarSection(this)">CIN CLI <span class="cin-collapse-icon">▼</span></h4>
                    <ul class="cin-nav-list cin-collapsible-content cin-collapsed">
                        <li><a href="${pathPrefix}cin-cli.html" class="cin-sidebar-item" data-translate="أداة CIN-CLI" data-search-terms="cin cli tool أداة command line interface">CIN-CLI Tool</a></li>
                        <li><a href="${pathPrefix}cin-cli_commands.html" class="cin-sidebar-item" data-translate="الأوامر المتاحة" data-search-terms="available commands أوامر متاحة help install update">Available Commands</a></li>
                        <li><a href="${pathPrefix}cin-cli_release_notes.html" class="cin-sidebar-item" data-translate="ملاحظات الإصدار" data-search-terms="release notes ملاحظات الإصدار changelog version history">Release Notes</a></li>
                    </ul>
                </div>
                <!--<div class="cin-sidebar-section" data-searchable="tools" data-search-terms="tools cin أدوات ضغط compression css js json html">
                    <h4 class="cin-sidebar-title cin-collapsible" data-translate="أدوات CIN" onclick="toggleSidebarSection(this)">TOOLS CIN <span class="cin-collapse-icon">▼</span></h4>
                    <ul class="cin-nav-list cin-collapsible-content cin-collapsed">
                        <li><a href="${pathPrefix}compression_css.html" class="cin-sidebar-item" data-translate="ضغط CSS" data-search-terms="css compression ضغط سي اس اس">CSS Compression</a></li>
                        <li><a href="${pathPrefix}compression_js.html" class="cin-sidebar-item" data-translate="ضغط JS" data-search-terms="js javascript compression ضغط جافا سكريبت">JS Compression</a></li>
                        <li><a href="${pathPrefix}compression_json.html" class="cin-sidebar-item" data-translate="ضغط JSON" data-search-terms="json compression ضغط جيسون">JSON Compression</a></li>
                        <li><a href="${pathPrefix}compression_html.html" class="cin-sidebar-item" data-translate="ضغط HTML" data-search-terms="html compression ضغط اتش تي ام ال">HTML Compression</a></li>
                    </ul>
                </div>-->
                <div class="cin-sidebar-section" data-searchable="cin" data-search-terms="cin حول about faq reporting guidelines">
                    <h4 class="cin-sidebar-title cin-collapsible" data-translate="CIN" onclick="toggleSidebarSection(this)">CIN <span class="cin-collapse-icon">▼</span></h4>
                    <ul class="cin-nav-list cin-collapsible-content">
                        <li><a href="${pathPrefix}about.html" class="cin-sidebar-item" data-translate="حول" data-search-terms="about cin حول">About CIN</a></li>
                        <li><a href="${pathPrefix}privacy_policy.html" class="cin-sidebar-item" data-translate="سياسة الخصوصية" data-search-terms="privacy policy سياسة الخصوصية">Privacy Policy</a></li>
                        <li><a href="${pathPrefix}faq.html" class="cin-sidebar-item" data-translate="الأسئلة الشائعة" data-search-terms="faq أسئلة شائعة frequently asked questions">FAQ</a></li>
                        <li><a href="${pathPrefix}reporting_guidelines.html" class="cin-sidebar-item" data-translate="إرشادات الإبلاغ" data-search-terms="reporting guidelines إرشادات الإبلاغ">Reporting Guidelines</a></li>
                    </ul>
                </div>
            </nav>
        </aside>
    `;
}

/**
 * Saves the sidebar sections state to localStorage
 * @param {string} sectionKey The section identifier
 * @param {boolean} isCollapsed Whether the section is collapsed
 */
function saveSidebarState(sectionKey, isCollapsed) {
    try {
        const sidebarState = JSON.parse(localStorage.getItem('cin_sidebar_state') || '{}');
        sidebarState[sectionKey] = isCollapsed;
        localStorage.setItem('cin_sidebar_state', JSON.stringify(sidebarState));
    } catch (e) {
        // Ignore localStorage errors
    }
}

/**
 * Gets the saved sidebar state from localStorage
 * @param {string} sectionKey The section identifier
 * @returns {boolean|null} The saved state or null if not found
 */
function getSidebarState(sectionKey) {
    try {
        const sidebarState = JSON.parse(localStorage.getItem('cin_sidebar_state') || '{}');
        return sidebarState[sectionKey];
    } catch (e) {
        return null;
    }
}

/**
 * Toggles the visibility of sidebar sections
 * @param {HTMLElement} element The clicked section header
 */
function toggleSidebarSection(element) {
    const content = element.nextElementSibling;
    const icon = element.querySelector('.cin-collapse-icon');
    const sectionKey = element.getAttribute('data-translate') || 'unknown';
    
    if (content && content.classList.contains('cin-collapsible-content')) {
        content.classList.toggle('cin-collapsed');
        
        if (icon) {
            icon.textContent = content.classList.contains('cin-collapsed') ? '▶' : '▼';
        }
        
        // Save the state
        saveSidebarState(sectionKey, content.classList.contains('cin-collapsed'));
    }
}

/**
 * Restores the saved sidebar sections state
 */
function restoreSidebarState() {
     const collapsibleSections = document.querySelectorAll('.cin-collapsible');
     
     collapsibleSections.forEach(section => {
         const sectionKey = section.getAttribute('data-translate') || 'unknown';
         const savedState = getSidebarState(sectionKey);
         const content = section.nextElementSibling;
         const icon = section.querySelector('.cin-collapse-icon');
         
         if (savedState !== null && content && content.classList.contains('cin-collapsible-content')) {
             if (savedState) {
                 content.classList.add('cin-collapsed');
                 if (icon) icon.textContent = '▶';
             } else {
                 content.classList.remove('cin-collapsed');
                 if (icon) icon.textContent = '▼';
             }
         } else {
             // Default states for sections without saved state
             if (sectionKey === 'cin') {
                 // CIN section: open by default
                 content.classList.remove('cin-collapsed');
                 if (icon) icon.textContent = '▼';
             } else if (sectionKey === 'tools_cin') {
                 // TOOLS CIN section: closed by default
                 content.classList.add('cin-collapsed');
                 if (icon) icon.textContent = '▶';
             }
         }
     });
 }

/**
 * Initializes the sidebar component
 * @param {string} containerId The container element ID
 */
function initializeSidebar(containerId = "sidebar-container") {
    const container = document.getElementById(containerId);
    
    if (container) {
        container.innerHTML = generateSidebarHTML();
    } else {
        const sidebarHTML = generateSidebarHTML();
        document.body.insertAdjacentHTML("afterbegin", sidebarHTML);
    }
    

    
    // Restore saved state after a short delay to ensure DOM is ready
    setTimeout(restoreSidebarState, 100);
}

// Initialize sidebar when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    if (!document.getElementById("sidebar")) {
        initializeSidebar();
    }
    initializeSearch();
});

/**
 * Search and filter sidebar sections
 * @param {string} searchTerm - The search term to filter by
 */
function filterSidebar(searchTerm) {
    const sections = document.querySelectorAll('.cin-sidebar-section[data-searchable]');
    const noResultsDiv = document.getElementById('cin-search-no-results');
    let hasResults = false;
    
    searchTerm = searchTerm.toLowerCase().trim();
    
    sections.forEach(section => {
        const searchTerms = section.getAttribute('data-search-terms') || '';
        const sectionTitle = section.querySelector('.cin-sidebar-title')?.textContent || '';
        const items = section.querySelectorAll('.cin-sidebar-item');
        
        let sectionHasMatch = false;
        
        // Check section title and terms
        if (searchTerm === '' || 
            searchTerms.toLowerCase().includes(searchTerm) || 
            sectionTitle.toLowerCase().includes(searchTerm)) {
            sectionHasMatch = true;
        }
        
        // Check individual items
        items.forEach(item => {
            const itemTerms = item.getAttribute('data-search-terms') || '';
            const itemText = item.textContent || '';
            
            if (searchTerm === '' || 
                itemTerms.toLowerCase().includes(searchTerm) || 
                itemText.toLowerCase().includes(searchTerm)) {
                item.style.display = '';
                sectionHasMatch = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show/hide section based on matches
        if (sectionHasMatch) {
            section.classList.remove('cin-hidden');
            hasResults = true;
            
            // If searching, expand collapsed sections that have matches
            if (searchTerm !== '' && section.classList.contains('cin-collapsible')) {
                const content = section.querySelector('.cin-collapsible-content');
                if (content && content.classList.contains('cin-collapsed')) {
                    content.classList.remove('cin-collapsed');
                    const icon = section.querySelector('.cin-collapse-icon');
                    if (icon) icon.textContent = '▼';
                }
            }
        } else {
            section.classList.add('cin-hidden');
        }
    });
    
    // Show/hide no results message
    if (searchTerm !== '' && !hasResults) {
        noResultsDiv.style.display = 'block';
    } else {
        noResultsDiv.style.display = 'none';
    }
}

/**
 * Initialize search functionality
 */
function initializeSearch() {
    const searchInput = document.getElementById('cin-sidebar-search');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            filterSidebar(e.target.value);
        });
        
        // Clear search on escape key
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                e.target.value = '';
                filterSidebar('');
            }
        });
    }
}

// Export sidebar functionality
window.CinSidebar = {
    generate: generateSidebarHTML,
    initialize: initializeSidebar,
    getPathPrefix: getCurrentPathPrefix,
    toggleSection: toggleSidebarSection,
    saveState: saveSidebarState,
    getState: getSidebarState,
    restoreState: restoreSidebarState,
    filterSidebar: filterSidebar
};