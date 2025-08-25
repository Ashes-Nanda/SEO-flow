interface SEOReportData {
  url: string;
  keyword?: any;
  content?: any;
  technical?: any;
  backlink?: any;
  competitor?: any;
}

export class PDFService {
  async generateSEOReport(data: SEOReportData): Promise<{ success: boolean; message: string }> {
    try {
      // Generate HTML content for the report
      const htmlContent = this.generateReportHTML(data);
      
      // Create a blob with the HTML content
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = url;
      link.download = `seo-report-${data.url.replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return {
        success: true,
        message: 'SEO report downloaded successfully'
      };

    } catch (error) {
      console.error('PDF generation error:', error);
      return {
        success: false,
        message: `Failed to generate report: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  private generateReportHTML(data: SEOReportData): string {
    const currentDate = new Date().toLocaleDateString();
    
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SEO Audit Report - ${data.url}</title>
        <style>
          ${this.getReportStyles()}
        </style>
      </head>
      <body>
        ${this.generateExecutiveSummary(data)}
        ${this.generateKeywordSection(data.keyword)}
        ${this.generateContentSection(data.content)}
        ${this.generateTechnicalSection(data.technical)}
        ${this.generateBacklinkSection(data.backlink)}
        ${this.generateCompetitorSection(data.competitor)}
        ${this.generateRecommendations(data)}
      </body>
      </html>
    `;
  }

  private getReportStyles(): string {
    return `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Arial', sans-serif;
        line-height: 1.6;
        color: #1a1a1a;
        background: #ffffff;
      }

      .page-break {
        page-break-before: always;
      }

      .container {
        max-width: 100%;
        margin: 0 auto;
        padding: 20px;
      }

      /* Neo-Brutalism Design Elements */
      .brutal-card {
        background: #ffffff;
        border: 4px solid #000000;
        box-shadow: 8px 8px 0px #000000;
        margin-bottom: 30px;
        padding: 25px;
      }

      .brutal-header {
        background: #000000;
        color: #ffffff;
        padding: 15px 25px;
        margin: -25px -25px 25px -25px;
        font-weight: bold;
        font-size: 18px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .brutal-button {
        background: #ff6b35;
        color: #ffffff;
        border: 3px solid #000000;
        padding: 8px 16px;
        font-weight: bold;
        text-transform: uppercase;
        box-shadow: 4px 4px 0px #000000;
        display: inline-block;
        margin: 5px;
      }

      /* Executive Summary Styles */
      .executive-summary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: 4px solid #000000;
        box-shadow: 12px 12px 0px #000000;
        padding: 30px;
        margin-bottom: 40px;
      }

      .summary-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }

      .summary-metric {
        background: rgba(255, 255, 255, 0.2);
        border: 2px solid #ffffff;
        padding: 15px;
        text-align: center;
      }

      .metric-value {
        font-size: 32px;
        font-weight: bold;
        display: block;
      }

      .metric-label {
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      /* Section Styles */
      .section-title {
        font-size: 24px;
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 4px solid #000000;
      }

      .subsection-title {
        font-size: 18px;
        font-weight: bold;
        margin: 20px 0 10px 0;
        color: #333;
      }

      /* Table Styles */
      .brutal-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        border: 3px solid #000000;
        margin: 20px 0;
      }

      .brutal-table th {
        background: #000000;
        color: #ffffff;
        padding: 12px;
        text-align: left;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 12px;
        letter-spacing: 1px;
      }

      .brutal-table td {
        padding: 12px;
        border-bottom: 2px solid #000000;
        background: #ffffff;
      }

      .brutal-table tr:nth-child(even) td {
        background: #f8f8f8;
      }

      /* Status Indicators */
      .status-good {
        background: #4ade80 !important;
        color: #000000;
        padding: 4px 8px;
        font-weight: bold;
        border: 2px solid #000000;
      }

      .status-warning {
        background: #fbbf24 !important;
        color: #000000;
        padding: 4px 8px;
        font-weight: bold;
        border: 2px solid #000000;
      }

      .status-critical {
        background: #ef4444 !important;
        color: #ffffff;
        padding: 4px 8px;
        font-weight: bold;
        border: 2px solid #000000;
      }

      /* Progress Bars */
      .progress-container {
        background: #e5e5e5;
        border: 2px solid #000000;
        height: 25px;
        margin: 10px 0;
        position: relative;
      }

      .progress-bar {
        height: 100%;
        background: #4ade80;
        border-right: 2px solid #000000;
        position: relative;
      }

      .progress-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: bold;
        font-size: 12px;
        color: #000000;
      }

      /* Charts Placeholder */
      .chart-placeholder {
        background: #f0f0f0;
        border: 3px solid #000000;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: #666;
        margin: 20px 0;
      }

      /* Recommendations */
      .recommendation-item {
        background: #ffffff;
        border: 3px solid #000000;
        padding: 15px;
        margin: 10px 0;
        box-shadow: 4px 4px 0px #000000;
      }

      .priority-high {
        border-left: 8px solid #ef4444;
      }

      .priority-medium {
        border-left: 8px solid #fbbf24;
      }

      .priority-low {
        border-left: 8px solid #4ade80;
      }

      /* Utility Classes */
      .text-center { text-align: center; }
      .text-bold { font-weight: bold; }
      .mb-20 { margin-bottom: 20px; }
      .mt-20 { margin-top: 20px; }
      
      .grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
      }

      .grid-3 {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px;
      }

      @media print {
        .page-break {
          page-break-before: always;
        }
        
        body {
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
        }
      }
    `;
  }

  private generateExecutiveSummary(data: SEOReportData): string {
    const keywordData = data.keyword || {};
    const technicalData = data.technical || {};
    const backlinkData = data.backlink || {};
    const contentData = data.content || {};

    return `
      <div class="executive-summary">
        <h1 style="font-size: 32px; margin-bottom: 10px;">SEO AUDIT REPORT</h1>
        <h2 style="font-size: 20px; margin-bottom: 20px;">${data.url}</h2>
        <p style="font-size: 16px; margin-bottom: 20px;">
          Generated on ${new Date().toLocaleDateString()} | Comprehensive SEO Analysis & Recommendations
        </p>
        
        <div class="summary-grid">
          <div class="summary-metric">
            <span class="metric-value">${keywordData.totalKeywords || 0}</span>
            <span class="metric-label">Total Keywords</span>
          </div>
          <div class="summary-metric">
            <span class="metric-value">${keywordData.averagePosition || 'N/A'}</span>
            <span class="metric-label">Avg Position</span>
          </div>
          <div class="summary-metric">
            <span class="metric-value">${technicalData.pageSpeedScores?.mobile?.performance || 0}</span>
            <span class="metric-label">Mobile Score</span>
          </div>
          <div class="summary-metric">
            <span class="metric-value">${backlinkData.totalBacklinks || 0}</span>
            <span class="metric-label">Total Backlinks</span>
          </div>
          <div class="summary-metric">
            <span class="metric-value">${contentData.contentGrade || 'N/A'}</span>
            <span class="metric-label">Content Grade</span>
          </div>
        </div>

        <div style="margin-top: 30px;">
          <h3 style="font-size: 18px; margin-bottom: 15px;">🚨 URGENT ISSUES</h3>
          <div style="background: rgba(239, 68, 68, 0.2); border: 2px solid #ffffff; padding: 15px;">
            ${this.getUrgentIssues(data)}
          </div>
        </div>

        <div style="margin-top: 20px;">
          <h3 style="font-size: 18px; margin-bottom: 15px;">⚡ QUICK WINS</h3>
          <div style="background: rgba(74, 222, 128, 0.2); border: 2px solid #ffffff; padding: 15px;">
            ${this.getQuickWins(data)}
          </div>
        </div>
      </div>
    `;
  }

  private generateKeywordSection(keywordData: any): string {
    if (!keywordData) return '';

    return `
      <div class="page-break">
        <div class="container">
          <div class="brutal-card">
            <div class="brutal-header">🎯 Keyword Rankings Analysis</div>
            
            <div class="grid-2 mb-20">
              <div>
                <h3 class="subsection-title">Performance Overview</h3>
                <div class="progress-container">
                  <div class="progress-bar" style="width: ${Math.min(keywordData.totalKeywords * 2, 100)}%">
                    <div class="progress-text">${keywordData.totalKeywords} Keywords Tracked</div>
                  </div>
                </div>
                <p><strong>Average Position:</strong> ${keywordData.averagePosition}</p>
                <p><strong>Keywords in Top 10:</strong> ${keywordData.topKeywords?.filter((k: any) => k.position <= 10).length || 0}</p>
                <p><strong>Keywords in Top 3:</strong> ${keywordData.topKeywords?.filter((k: any) => k.position <= 3).length || 0}</p>
              </div>
              <div class="chart-placeholder">
                📊 KEYWORD DISTRIBUTION CHART
                <br><small>Top 3: ${keywordData.topKeywords?.filter((k: any) => k.position <= 3).length || 0} keywords (${Math.round(((keywordData.topKeywords?.filter((k: any) => k.position <= 3).length || 0) / (keywordData.totalKeywords || 1)) * 100)}%)</small>
                <br><small>Top 10: ${keywordData.topKeywords?.filter((k: any) => k.position <= 10).length || 0} keywords (${Math.round(((keywordData.topKeywords?.filter((k: any) => k.position <= 10).length || 0) / (keywordData.totalKeywords || 1)) * 100)}%)</small>
                <br><small>Beyond 50: ${keywordData.topKeywords?.filter((k: any) => k.position > 50).length || 0} keywords</small>
              </div>
            </div>

            <h3 class="subsection-title">Top Performing Keywords</h3>
            <table class="brutal-table">
              <thead>
                <tr>
                  <th>Keyword</th>
                  <th>Position</th>
                  <th>Volume</th>
                  <th>Difficulty</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${keywordData.topKeywords?.slice(0, 10).map((keyword: any) => `
                  <tr>
                    <td><strong>${keyword.keyword}</strong></td>
                    <td>#${keyword.position}</td>
                    <td>${keyword.volume?.toLocaleString() || 'N/A'}</td>
                    <td>${keyword.difficulty || 'N/A'}</td>
                    <td>
                      <span class="${keyword.position <= 3 ? 'status-good' : keyword.position <= 10 ? 'status-warning' : 'status-critical'}">
                        ${keyword.position <= 3 ? 'EXCELLENT' : keyword.position <= 10 ? 'GOOD' : 'NEEDS WORK'}
                      </span>
                    </td>
                  </tr>
                `).join('') || '<tr><td colspan="5">No keyword data available</td></tr>'}
              </tbody>
            </table>

            ${keywordData.opportunities?.length > 0 ? `
              <h3 class="subsection-title">Keyword Opportunities</h3>
              <table class="brutal-table">
                <thead>
                  <tr>
                    <th>Keyword</th>
                    <th>Current Position</th>
                    <th>Opportunity</th>
                    <th>Potential Traffic</th>
                  </tr>
                </thead>
                <tbody>
                  ${keywordData.opportunities.slice(0, 5).map((opp: any) => `
                    <tr>
                      <td><strong>${opp.keyword}</strong></td>
                      <td>#${opp.currentPosition}</td>
                      <td>${opp.opportunity}</td>
                      <td>+${opp.potentialTraffic} visits/month</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  private generateContentSection(contentData: any): string {
    if (!contentData) return '';

    return `
      <div class="page-break">
        <div class="container">
          <div class="brutal-card">
            <div class="brutal-header">📝 Content Audit Analysis</div>
            
            <div class="grid-2 mb-20">
              <div>
                <h3 class="subsection-title">Content Metrics</h3>
                <p><strong>Word Count:</strong> ${contentData.wordCount?.toLocaleString() || 'N/A'}</p>
                <p><strong>Readability Score:</strong> ${contentData.readabilityScore || 'N/A'}/100</p>
                <p><strong>Content Grade:</strong> <span class="brutal-button">${contentData.contentGrade || 'N/A'}</span></p>
                
                <div class="progress-container mt-20">
                  <div class="progress-bar" style="width: ${contentData.readabilityScore || 0}%">
                    <div class="progress-text">Readability: ${contentData.readabilityScore || 0}%</div>
                  </div>
                </div>
              </div>
              <div class="chart-placeholder">
                📈 CONTENT QUALITY METRICS
                <br><small>Overall Grade: ${contentData.contentGrade || 'N/A'}</small>
                <br><small>Readability: ${contentData.readabilityScore || 0}/100</small>
                <br><small>Word Count: ${contentData.wordCount?.toLocaleString() || 'N/A'}</small>
              </div>
            </div>

            <h3 class="subsection-title">Meta Data Analysis</h3>
            <table class="brutal-table">
              <thead>
                <tr>
                  <th>Element</th>
                  <th>Content</th>
                  <th>Length</th>
                  <th>Status</th>
                  <th>Recommendation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Title Tag</strong></td>
                  <td>${contentData.metaData?.title?.content?.substring(0, 50) || 'N/A'}...</td>
                  <td>${contentData.metaData?.title?.length || 0} chars</td>
                  <td>
                    <span class="${contentData.metaData?.title?.status === 'optimal' ? 'status-good' : 'status-warning'}">
                      ${contentData.metaData?.title?.status?.toUpperCase() || 'UNKNOWN'}
                    </span>
                  </td>
                  <td>${contentData.metaData?.title?.recommendation || 'No recommendation'}</td>
                </tr>
                <tr>
                  <td><strong>Meta Description</strong></td>
                  <td>${contentData.metaData?.description?.content?.substring(0, 50) || 'N/A'}...</td>
                  <td>${contentData.metaData?.description?.length || 0} chars</td>
                  <td>
                    <span class="${contentData.metaData?.description?.status === 'optimal' ? 'status-good' : 'status-warning'}">
                      ${contentData.metaData?.description?.status?.toUpperCase() || 'UNKNOWN'}
                    </span>
                  </td>
                  <td>${contentData.metaData?.description?.recommendation || 'No recommendation'}</td>
                </tr>
                <tr>
                  <td><strong>H1 Tag</strong></td>
                  <td>${contentData.metaData?.h1Content?.substring(0, 50) || 'N/A'}...</td>
                  <td>${contentData.metaData?.h1Count || 0} tags</td>
                  <td>
                    <span class="${contentData.metaData?.h1Status === 'good' ? 'status-good' : 'status-critical'}">
                      ${contentData.metaData?.h1Status?.toUpperCase() || 'MISSING'}
                    </span>
                  </td>
                  <td>${contentData.metaData?.h1Count === 1 ? 'Perfect H1 structure' : 'Optimize H1 tags'}</td>
                </tr>
              </tbody>
            </table>

            ${contentData.issues?.length > 0 ? `
              <h3 class="subsection-title">Content Issues & Recommendations</h3>
              ${contentData.issues.map((issue: any) => `
                <div class="recommendation-item priority-${issue.type === 'critical' ? 'high' : issue.type === 'warning' ? 'medium' : 'low'}">
                  <h4 style="color: ${issue.type === 'critical' ? '#ef4444' : issue.type === 'warning' ? '#f59e0b' : '#10b981'}; margin-bottom: 5px;">
                    ${issue.type.toUpperCase()}: ${issue.issue}
                  </h4>
                  <p>${issue.recommendation}</p>
                </div>
              `).join('')}
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  private generateTechnicalSection(technicalData: any): string {
    if (!technicalData) return '';

    return `
      <div class="page-break">
        <div class="container">
          <div class="brutal-card">
            <div class="brutal-header">⚡ Technical SEO Analysis</div>
            
            <h3 class="subsection-title">PageSpeed Scores</h3>
            <div class="grid-2 mb-20">
              <div>
                <h4 style="margin-bottom: 10px;">📱 Mobile Scores</h4>
                <div class="progress-container">
                  <div class="progress-bar" style="width: ${technicalData.pageSpeedScores?.mobile?.performance || 0}%; background: ${this.getScoreColor(technicalData.pageSpeedScores?.mobile?.performance)}">
                    <div class="progress-text">Performance: ${technicalData.pageSpeedScores?.mobile?.performance || 0}</div>
                  </div>
                </div>
                <div class="progress-container">
                  <div class="progress-bar" style="width: ${technicalData.pageSpeedScores?.mobile?.accessibility || 0}%; background: ${this.getScoreColor(technicalData.pageSpeedScores?.mobile?.accessibility)}">
                    <div class="progress-text">Accessibility: ${technicalData.pageSpeedScores?.mobile?.accessibility || 0}</div>
                  </div>
                </div>
                <div class="progress-container">
                  <div class="progress-bar" style="width: ${technicalData.pageSpeedScores?.mobile?.seo || 0}%; background: ${this.getScoreColor(technicalData.pageSpeedScores?.mobile?.seo)}">
                    <div class="progress-text">SEO: ${technicalData.pageSpeedScores?.mobile?.seo || 0}</div>
                  </div>
                </div>
              </div>
              <div>
                <h4 style="margin-bottom: 10px;">🖥️ Desktop Scores</h4>
                <div class="progress-container">
                  <div class="progress-bar" style="width: ${technicalData.pageSpeedScores?.desktop?.performance || 0}%; background: ${this.getScoreColor(technicalData.pageSpeedScores?.desktop?.performance)}">
                    <div class="progress-text">Performance: ${technicalData.pageSpeedScores?.desktop?.performance || 0}</div>
                  </div>
                </div>
                <div class="progress-container">
                  <div class="progress-bar" style="width: ${technicalData.pageSpeedScores?.desktop?.accessibility || 0}%; background: ${this.getScoreColor(technicalData.pageSpeedScores?.desktop?.accessibility)}">
                    <div class="progress-text">Accessibility: ${technicalData.pageSpeedScores?.desktop?.accessibility || 0}</div>
                  </div>
                </div>
                <div class="progress-container">
                  <div class="progress-bar" style="width: ${technicalData.pageSpeedScores?.desktop?.seo || 0}%; background: ${this.getScoreColor(technicalData.pageSpeedScores?.desktop?.seo)}">
                    <div class="progress-text">SEO: ${technicalData.pageSpeedScores?.desktop?.seo || 0}</div>
                  </div>
                </div>
              </div>
            </div>

            <h3 class="subsection-title">Core Web Vitals</h3>
            <table class="brutal-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                  <th>Status</th>
                  <th>Threshold</th>
                  <th>Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Largest Contentful Paint (LCP)</strong></td>
                  <td>${technicalData.coreWebVitals?.lcp?.value || 'N/A'}s</td>
                  <td>
                    <span class="${this.getVitalStatusClass(technicalData.coreWebVitals?.lcp?.status)}">
                      ${technicalData.coreWebVitals?.lcp?.status?.toUpperCase() || 'UNKNOWN'}
                    </span>
                  </td>
                  <td>${technicalData.coreWebVitals?.lcp?.threshold || 'N/A'}</td>
                  <td>Loading Performance</td>
                </tr>
                <tr>
                  <td><strong>First Input Delay (FID)</strong></td>
                  <td>${technicalData.coreWebVitals?.fid?.value || 'N/A'}ms</td>
                  <td>
                    <span class="${this.getVitalStatusClass(technicalData.coreWebVitals?.fid?.status)}">
                      ${technicalData.coreWebVitals?.fid?.status?.toUpperCase() || 'UNKNOWN'}
                    </span>
                  </td>
                  <td>${technicalData.coreWebVitals?.fid?.threshold || 'N/A'}</td>
                  <td>Interactivity</td>
                </tr>
                <tr>
                  <td><strong>Cumulative Layout Shift (CLS)</strong></td>
                  <td>${technicalData.coreWebVitals?.cls?.value || 'N/A'}</td>
                  <td>
                    <span class="${this.getVitalStatusClass(technicalData.coreWebVitals?.cls?.status)}">
                      ${technicalData.coreWebVitals?.cls?.status?.toUpperCase() || 'UNKNOWN'}
                    </span>
                  </td>
                  <td>${technicalData.coreWebVitals?.cls?.threshold || 'N/A'}</td>
                  <td>Visual Stability</td>
                </tr>
              </tbody>
            </table>

            ${technicalData.technicalIssues?.length > 0 ? `
              <h3 class="subsection-title">Technical Issues</h3>
              ${technicalData.technicalIssues.map((issue: any) => `
                <div class="recommendation-item priority-${issue.type === 'critical' ? 'high' : issue.type === 'warning' ? 'medium' : 'low'}">
                  <h4 style="color: ${issue.type === 'critical' ? '#ef4444' : issue.type === 'warning' ? '#f59e0b' : '#10b981'}; margin-bottom: 5px;">
                    ${issue.type.toUpperCase()}: ${issue.issue}
                  </h4>
                  <p><strong>Impact:</strong> ${issue.impact}</p>
                  <p><strong>Fix:</strong> ${issue.recommendation}</p>
                </div>
              `).join('')}
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  private generateBacklinkSection(backlinkData: any): string {
    if (!backlinkData) return '';

    return `
      <div class="page-break">
        <div class="container">
          <div class="brutal-card">
            <div class="brutal-header">🔗 Backlink Profile Analysis</div>
            
            <div class="grid-3 mb-20">
              <div>
                <h3 class="subsection-title">Backlink Overview</h3>
                <p><strong>Total Backlinks:</strong> ${backlinkData.totalBacklinks?.toLocaleString() || 'N/A'}</p>
                <p><strong>Referring Domains:</strong> ${backlinkData.uniqueDomains || 'N/A'}</p>
                <p><strong>Domain Authority:</strong> ${backlinkData.domainAuthority || 'N/A'}</p>
              </div>
              <div>
                <h3 class="subsection-title">Link Quality</h3>
                <div class="progress-container">
                  <div class="progress-bar" style="width: ${backlinkData.linkQuality?.healthy || 0}%; background: #4ade80">
                    <div class="progress-text">Healthy: ${backlinkData.linkQuality?.healthy || 0}%</div>
                  </div>
                </div>
                <p><strong>Spam Links:</strong> ${backlinkData.linkQuality?.spam || 0}%</p>
                <p><strong>Toxic Links:</strong> ${backlinkData.linkQuality?.toxic || 0}%</p>
              </div>
              <div class="chart-placeholder">
                🔗 BACKLINK QUALITY ANALYSIS
                <br><small>Healthy: ${backlinkData.linkQuality?.healthy || 0}%</small>
                <br><small>Spam: ${backlinkData.linkQuality?.spam || 0}%</small>
                <br><small>Toxic: ${backlinkData.linkQuality?.toxic || 0}%</small>
              </div>
            </div>

            <h3 class="subsection-title">Top Referring Domains</h3>
            <table class="brutal-table">
              <thead>
                <tr>
                  <th>Domain</th>
                  <th>Backlinks</th>
                  <th>Authority</th>
                  <th>Type</th>
                  <th>Quality</th>
                </tr>
              </thead>
              <tbody>
                ${backlinkData.topReferringDomains?.slice(0, 10).map((domain: any) => `
                  <tr>
                    <td><strong>${domain.domain}</strong></td>
                    <td>${domain.backlinks}</td>
                    <td>${domain.authority}</td>
                    <td>${domain.type}</td>
                    <td>
                      <span class="${domain.authority >= 60 ? 'status-good' : domain.authority >= 40 ? 'status-warning' : 'status-critical'}">
                        ${domain.authority >= 60 ? 'HIGH' : domain.authority >= 40 ? 'MEDIUM' : 'LOW'}
                      </span>
                    </td>
                  </tr>
                `).join('') || '<tr><td colspan="5">No backlink data available</td></tr>'}
              </tbody>
            </table>

            ${backlinkData.anchorTextDistribution?.length > 0 ? `
              <h3 class="subsection-title">Anchor Text Distribution</h3>
              <table class="brutal-table">
                <thead>
                  <tr>
                    <th>Anchor Text</th>
                    <th>Percentage</th>
                    <th>Count</th>
                    <th>Risk Level</th>
                  </tr>
                </thead>
                <tbody>
                  ${backlinkData.anchorTextDistribution.slice(0, 8).map((anchor: any) => `
                    <tr>
                      <td><strong>${anchor.anchor}</strong></td>
                      <td>${anchor.percentage}%</td>
                      <td>${anchor.count}</td>
                      <td>
                        <span class="${anchor.percentage > 30 ? 'status-critical' : anchor.percentage > 15 ? 'status-warning' : 'status-good'}">
                          ${anchor.percentage > 30 ? 'HIGH RISK' : anchor.percentage > 15 ? 'MODERATE' : 'SAFE'}
                        </span>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  private generateCompetitorSection(competitorData: any): string {
    if (!competitorData) return '';

    return `
      <div class="page-break">
        <div class="container">
          <div class="brutal-card">
            <div class="brutal-header">🏆 Competitor Benchmarking</div>
            
            <h3 class="subsection-title">Competitor Analysis Overview</h3>
            ${competitorData.competitors?.map((competitor: any, index: number) => `
              <div class="mb-20">
                <h4 style="color: #7c3aed; margin-bottom: 15px; font-size: 18px;">
                  Competitor ${index + 1}: ${competitor.url}
                </h4>
                
                <div class="grid-2">
                  <div>
                    <h5 class="subsection-title">Keyword Gaps</h5>
                    <table class="brutal-table">
                      <thead>
                        <tr>
                          <th>Keyword</th>
                          <th>Their Position</th>
                          <th>Your Position</th>
                          <th>Volume</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${competitor.keywordGaps?.slice(0, 5).map((gap: any) => `
                          <tr>
                            <td><strong>${gap.keyword}</strong></td>
                            <td>#${gap.theirPosition}</td>
                            <td>${gap.yourPosition ? '#' + gap.yourPosition : 'Not Ranking'}</td>
                            <td>${gap.volume?.toLocaleString() || 'N/A'}</td>
                          </tr>
                        `).join('') || '<tr><td colspan="4">No keyword gaps identified</td></tr>'}
                      </tbody>
                    </table>
                  </div>
                  
                  <div>
                    <h5 class="subsection-title">Technical Comparison</h5>
                    <table class="brutal-table">
                      <thead>
                        <tr>
                          <th>Metric</th>
                          <th>Competitor</th>
                          <th>You</th>
                          <th>Gap</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Page Speed</td>
                          <td>${competitor.technicalComparison?.pageSpeed?.theirs || 'N/A'}</td>
                          <td>${competitor.technicalComparison?.pageSpeed?.yours || 'N/A'}</td>
                          <td>
                            <span class="${(competitor.technicalComparison?.pageSpeed?.theirs || 0) > (competitor.technicalComparison?.pageSpeed?.yours || 0) ? 'status-critical' : 'status-good'}">
                              ${(competitor.technicalComparison?.pageSpeed?.theirs || 0) > (competitor.technicalComparison?.pageSpeed?.yours || 0) ? 'BEHIND' : 'AHEAD'}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Mobile Score</td>
                          <td>${competitor.technicalComparison?.mobileScore?.theirs || 'N/A'}</td>
                          <td>${competitor.technicalComparison?.mobileScore?.yours || 'N/A'}</td>
                          <td>
                            <span class="${(competitor.technicalComparison?.mobileScore?.theirs || 0) > (competitor.technicalComparison?.mobileScore?.yours || 0) ? 'status-critical' : 'status-good'}">
                              ${(competitor.technicalComparison?.mobileScore?.theirs || 0) > (competitor.technicalComparison?.mobileScore?.yours || 0) ? 'BEHIND' : 'AHEAD'}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Backlinks</td>
                          <td>${competitor.technicalComparison?.backlinks?.theirs?.toLocaleString() || 'N/A'}</td>
                          <td>${competitor.technicalComparison?.backlinks?.yours?.toLocaleString() || 'N/A'}</td>
                          <td>
                            <span class="${(competitor.technicalComparison?.backlinks?.theirs || 0) > (competitor.technicalComparison?.backlinks?.yours || 0) ? 'status-critical' : 'status-good'}">
                              ${(competitor.technicalComparison?.backlinks?.theirs || 0) > (competitor.technicalComparison?.backlinks?.yours || 0) ? 'BEHIND' : 'AHEAD'}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            `).join('') || '<p>No competitor data available</p>'}

            <h3 class="subsection-title">Strategic Gaps Identified</h3>
            ${competitorData.overallGaps?.map((gap: string, index: number) => `
              <div class="recommendation-item priority-high">
                <h4 style="color: #ef4444; margin-bottom: 5px;">GAP ${index + 1}: ${gap}</h4>
              </div>
            `).join('') || '<p>No strategic gaps identified</p>'}
          </div>
        </div>
      </div>
    `;
  }

  private generateRecommendations(data: SEOReportData): string {
    const recommendations = this.generateRecommendationsList(data);
    
    return `
      <div class="page-break">
        <div class="container">
          <div class="brutal-card">
            <div class="brutal-header">🎯 Recommendations & 3-Month Roadmap</div>
            
            <h3 class="subsection-title">Immediate Actions (Month 1)</h3>
            ${recommendations.immediate.map((rec: any, index: number) => `
              <div class="recommendation-item priority-high">
                <h4 style="color: #ef4444; margin-bottom: 5px;">
                  HIGH PRIORITY ${index + 1}: ${rec.title}
                </h4>
                <p><strong>Impact:</strong> ${rec.impact}</p>
                <p><strong>Effort:</strong> ${rec.effort}</p>
                <p><strong>Action:</strong> ${rec.action}</p>
              </div>
            `).join('')}

            <h3 class="subsection-title">Short-term Improvements (Month 2)</h3>
            ${recommendations.shortTerm.map((rec: any, index: number) => `
              <div class="recommendation-item priority-medium">
                <h4 style="color: #f59e0b; margin-bottom: 5px;">
                  MEDIUM PRIORITY ${index + 1}: ${rec.title}
                </h4>
                <p><strong>Impact:</strong> ${rec.impact}</p>
                <p><strong>Effort:</strong> ${rec.effort}</p>
                <p><strong>Action:</strong> ${rec.action}</p>
              </div>
            `).join('')}

            <h3 class="subsection-title">Long-term Strategy (Month 3+)</h3>
            ${recommendations.longTerm.map((rec: any, index: number) => `
              <div class="recommendation-item priority-low">
                <h4 style="color: #10b981; margin-bottom: 5px;">
                  STRATEGIC ${index + 1}: ${rec.title}
                </h4>
                <p><strong>Impact:</strong> ${rec.impact}</p>
                <p><strong>Effort:</strong> ${rec.effort}</p>
                <p><strong>Action:</strong> ${rec.action}</p>
              </div>
            `).join('')}

            <div style="margin-top: 40px; padding: 20px; background: #f0f9ff; border: 3px solid #0ea5e9;">
              <h3 style="color: #0ea5e9; margin-bottom: 15px;">📊 Expected Results</h3>
              <ul style="margin-left: 20px;">
                <li><strong>Month 1:</strong> 15-25% improvement in Core Web Vitals, fix critical technical issues</li>
                <li><strong>Month 2:</strong> 20-30% increase in organic keyword rankings, improved content performance</li>
                <li><strong>Month 3:</strong> 40-60% growth in organic traffic, stronger backlink profile</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private generateRecommendationsList(data: SEOReportData) {
    const immediate = [];
    const shortTerm = [];
    const longTerm = [];

    // Analyze technical issues for immediate actions
    if (data.technical?.coreWebVitals?.lcp?.status === 'poor') {
      immediate.push({
        title: 'Fix Largest Contentful Paint (LCP)',
        impact: 'High - Directly affects Google rankings',
        effort: 'Medium - Optimize images and server response',
        action: 'Compress images, enable CDN, optimize server response times'
      });
    }

    if (data.technical?.pageSpeedScores?.mobile?.performance < 70) {
      immediate.push({
        title: 'Improve Mobile Performance',
        impact: 'Critical - Mobile-first indexing priority',
        effort: 'High - Requires technical optimization',
        action: 'Minimize JavaScript, optimize CSS, implement lazy loading'
      });
    }

    // Content issues for short-term
    if (data.content?.metaData?.title?.status !== 'optimal') {
      shortTerm.push({
        title: 'Optimize Title Tags',
        impact: 'Medium - Improves click-through rates',
        effort: 'Low - Content optimization',
        action: 'Rewrite title tags to 30-60 characters with target keywords'
      });
    }

    if (data.content?.wordCount < 800) {
      shortTerm.push({
        title: 'Expand Content Depth',
        impact: 'Medium - Better topical authority',
        effort: 'Medium - Content creation',
        action: 'Add comprehensive sections, FAQs, and detailed explanations'
      });
    }

    // Backlink and competitor strategies for long-term
    if (data.backlink?.totalBacklinks < 500) {
      longTerm.push({
        title: 'Build Authority Backlinks',
        impact: 'High - Domain authority growth',
        effort: 'High - Outreach and relationship building',
        action: 'Guest posting, digital PR, industry partnerships'
      });
    }

    if (data.competitor?.competitors?.length > 0) {
      longTerm.push({
        title: 'Close Competitor Gaps',
        impact: 'High - Market share capture',
        effort: 'High - Comprehensive strategy',
        action: 'Target competitor keywords, improve content quality, build better backlinks'
      });
    }

    return { immediate, shortTerm, longTerm };
  }

  private getUrgentIssues(data: SEOReportData): string {
    const issues = [];
    
    if (data.technical?.coreWebVitals?.lcp?.status === 'poor') {
      issues.push('🚨 Poor LCP performance affecting rankings');
    }
    if (data.technical?.pageSpeedScores?.mobile?.performance < 50) {
      issues.push('🚨 Critical mobile performance issues');
    }
    if (data.content?.metaData?.title?.status === 'missing') {
      issues.push('🚨 Missing or poor title tags');
    }
    if (data.backlink?.linkQuality?.toxic > 5) {
      issues.push('🚨 High toxic backlink percentage');
    }

    return issues.length > 0 ? 
      issues.map(issue => `<p style="margin: 5px 0;">${issue}</p>`).join('') :
      '<p>No critical issues detected</p>';
  }

  private getQuickWins(data: SEOReportData): string {
    const wins = [];
    
    if (data.content?.metaData?.description?.status !== 'optimal') {
      wins.push('⚡ Optimize meta descriptions for better CTR');
    }
    if (data.content?.contentAnalysis?.imagesWithoutAlt > 0) {
      wins.push('⚡ Add alt text to images for accessibility');
    }
    if (data.keyword?.opportunities?.length > 0) {
      wins.push('⚡ Target low-competition keyword opportunities');
    }
    if (data.technical?.technicalIssues?.some((issue: any) => issue.type === 'opportunity')) {
      wins.push('⚡ Implement lazy loading for images');
    }

    return wins.length > 0 ? 
      wins.map(win => `<p style="margin: 5px 0;">${win}</p>`).join('') :
      '<p>Focus on technical performance improvements</p>';
  }

  private getScoreColor(score: number): string {
    if (score >= 90) return '#4ade80';
    if (score >= 70) return '#fbbf24';
    return '#ef4444';
  }

  private getVitalStatusClass(status: string): string {
    switch (status) {
      case 'good': return 'status-good';
      case 'needs-improvement': return 'status-warning';
      case 'poor': return 'status-critical';
      default: return 'status-warning';
    }
  }
}